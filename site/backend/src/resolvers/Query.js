const { forwardTo } = require('prisma-binding');

// If query same for server and Prisma, can forward query

const Query = {
	// easy forward, use when no auth req, no validation, no filtering, etc
	// items: forwardTo('db')

	async items(parent, args, ctx, info) {
		const items = ctx.db.query.items();
		return items;
	},
};

module.exports = Query;
