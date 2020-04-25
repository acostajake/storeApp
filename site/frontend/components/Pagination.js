import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';

import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';
import { PAGINATION_QUERY } from '../lib/queries';

const Pagination = (props) => {
	return (
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				if (loading) return <p>Loading pages...</p>;
				const count = data.itemsConnection.aggregate.count;
				const pages = Math.ceil(count / perPage);
				const page = props.page;
				return (
					<PaginationStyles>
						<Head>
							<title>Store | Page {page}</title>
						</Head>
						<Link
							prefetch
							href={{ pathname: 'items', query: { page: page - 1 } }}
						>
							<a className='prev' aria-disabled={page <= 1}>
								Prev
							</a>
						</Link>
						<p>
							Page {page} of {pages}
						</p>
						<p>{count} items total</p>
						<Link
							prefetch
							href={{ pathname: 'items', query: { page: page + 1 } }}
						>
							<a className='prev' aria-disabled={page >= pages}>
								Next
							</a>
						</Link>
					</PaginationStyles>
				);
			}}
		</Query>
	);
};

export default Pagination;
