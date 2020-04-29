// Info arg for mutations returns the query expected as defined in frontend

const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { hasPermission } = require('../utils');
const { makeEmail, transport } = require('../mail');

const successToken = (ctx, user) => {
	const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
	ctx.response.cookie('token', token, {
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 365,
	});
	return user;
};

const Mutations = {
	async addToCart(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error('You gotta log in!');
		}
		const [existingCartItem] = await ctx.db.query.cartItems({
			where: {
				user: { id: userId.id },
				item: { id: args.id },
			},
		});
		if (existingCartItem) {
			return ctx.db.mutation.updateCartItem(
				{
					where: { id: existingCartItem.id },
					data: { quantity: existingCartItem.quantity + 1 },
				},
				info
			);
		}
		return ctx.db.mutation.createCartItem(
			{
				data: {
					user: { connect: { id: userId } },
					item: { connect: { id: args.id } },
				},
			},
			info
		);
	},
	async removeFromCart(parent, args, ctx, info) {
		const itemToRemove = await ctx.db.query.cartItem(
			{
				where: {
					id: args.id,
				},
			},
			`{ id, user { id }}`
		);
		if (!itemToRemove) throw new Error('No item found');
		if (itemToRemove.user.id !== ctx.request.userId) {
			throw new Error('You must own your cart to remove an item');
		}
		return ctx.db.mutation.deleteCartItem({ where: { id: args.id } }, info);
	},
	async createItem(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('You need to log in to create items.');
		}
		const item = await ctx.db.mutation.createItem(
			{
				//  create relationship between item and user w connect
				data: {
					...args,
					user: {
						connect: { id: ctx.request.userId },
					},
				},
			},
			info
		);
		return item;
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		const item = await ctx.db.query.item({ where }, `{ id title user {id } }`);
		const isItemSeller = item.user.id === ctx.request.userId;
		const hasPermission = ctx.request.user.permissions.some((permission) => [
			'ADMIN',
			'ITEMDELETE',
		]);
		if (!isItemSeller && !hasPermission) {
			throw new Error('You need a permission to delete');
		}
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	updateItem(parent, args, ctx, info) {
		const updates = { ...args };
		delete updates.id;
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: { id: args.id },
			},
			info
		);
	},
	async resetPassword(parent, args, ctx, info) {
		if (args.password !== args.confirmPassword) {
			throw new Error('Your passwords do not match. ');
		}
		const [user] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000,
			},
		});
		if (!user) {
			throw new Error('This token is invalid or expired');
		}
		const password = await bcrypt.hash(args.password, 10);
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: { password, resetToken: null, resetTokenExpiry: null },
		});
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
		const withToken = successToken(ctx, updatedUser);
		return withToken;
	},
	async requestReset(parent, args, ctx, info) {
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`Account not found for ${email}`);
		}
		const resetToken = (await promisify(randomBytes)(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000;
		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry },
		});
		const mailRes = await transport.sendMail({
			from: 'notthehamburglar@gmail.com',
			to: user.email,
			subject: 'Your password reset token',
			html: makeEmail(`Your password reset token is here. 
			\n\n <a href='${
				process.env.FRONTEND_URL
			}/reset-password?resetToken=${resetToken}'>Click to reset</a>`),
		});
		return { message: 'Check your email!' };
	},
	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		args.password = await bcrypt.hash(args.password, 10);
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password: args.password,
					permissions: { set: ['USER'] },
				},
			},
			info
		);
		const withToken = successToken(ctx, user);
		return withToken;
	},
	async signin(parent, { email, password }, ctx, info) {
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`Account not found for ${email}`);
		}
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid password');
		}
		const withToken = successToken(ctx, user);
		return withToken;
	},
	async signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Signed out! ' };
	},
	async updatePermissions(parent, args, ctx, info) {
		console.log('pppppppppppp', args);
		if (!ctx.request.userId) {
			throw new Error('You must be logged in');
		}
		const currentUser = await ctx.db.query.user(
			{ where: { id: ctx.request.userId } },
			info
		);
		hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
		return ctx.db.mutation.updateUser(
			{
				// custom enum requires set rather than passing arg permissions directly
				data: {
					permissions: {
						set: args.permissions,
					},
				},
				where: { id: args.userId },
			},
			info
		);
	},
};

module.exports = Mutations;
