import { Query } from 'react-apollo';
import React from 'react';
import styled from 'styled-components';

import Item from './Item';
import { GET_ALL_ITEMS } from '../lib/queries';

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

const Items = () => {
	return (
		<Center>
			<Query query={GET_ALL_ITEMS}>
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
		</Center>
	);
};

export default Items;
