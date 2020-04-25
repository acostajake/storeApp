import { Query } from 'react-apollo';
import React from 'react';
import styled from 'styled-components';

import Item from './Item';
import Pagination from './Pagination';
import { GET_ALL_ITEMS } from '../lib/queries';
import { perPage } from '../config';

const Center = styled.div`
	text-align: center;
`;

const ItemList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

// Check apollo-hooks docs for viable replacement for fetch-policy

class Items extends React.Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={GET_ALL_ITEMS}
					fetchPolicy='network-only'
					variables={{
						skip: this.props.page * perPage - perPage,
					}}
				>
					{({ data, loading, error }) => {
						if (loading) return 'loading...';
						if (error) return <div>{error.message}</div>;
						return (
							<ItemList>
								{data.items.map((item) => (
									<Item item={item} key={item.id} />
								))}
							</ItemList>
						);
					}}
				</Query>
				<Pagination page={this.props.page} />
			</Center>
		);
	}
}

export default Items;
