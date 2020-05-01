const { forwardTo } = require('prisma-binding');

const { hasPermission } = require('../utils');

// If query same for server and Prisma, can forward query

const Query = {
	// async items(parent, args, ctx, info) {
	// 	const items = ctx.db.query.items();
	// 	return items;
	// },
	// easy forward, use when no auth req, no validation, no filtering, etc
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	// me query looks for logged in status from jwt on cookie
	me(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
	},
	async users(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('You must log in to continue.');
		}
		hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
		// return info w gql fields requested from client side
		return ctx.db.query.users({}, info);
	},
	async order(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('You must log in to see an order.');
		}
		const order = await ctx.db.query.order(
			{
				where: { id: args.id },
			},
			info
		);
		const ownsOrder = order.user.id === ctx.request.userId;
		const isAdmin = ctx.request.user.permissions.includes('ADMIN');
		if (!ownsOrder && !isAdmin) {
			throw new Error('You need permission to see this order.');
		}
		return order;
	},
	async orders(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error('You must log in to see the order list.');
		}
		return ctx.db.query.orders(
			{
				where: {
					user: { id: userId },
				},
			},
			info
		);
	},
};

module.exports = Query;
