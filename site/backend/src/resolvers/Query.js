const { forwardTo } = require('prisma-binding');

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
};

module.exports = Query;
