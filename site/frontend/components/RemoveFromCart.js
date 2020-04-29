import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CURRENT_USER, REMOVE_FROM_CART } from '../lib/queries';

const RemoveItemButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: ${(props) => props.theme.lightblue};
		cursor: pointer;
	}
`;

const RemoveFromCart = (props) => {
	const updateCache = (cache, payload) => {
		const data = cache.readQuery({ query: CURRENT_USER });
		const cartItemId = payload.data.removeFromCart.id;
		data.me.cart = data.me.cart.filter(
			(cartItem) => cartItem.id !== cartItemId
		);
		cache.writeQuery({ query: CURRENT_USER, data });
	};

	return (
		<Mutation
			mutation={REMOVE_FROM_CART}
			variables={{ id: props.id }}
			update={updateCache}
			optimisticResponse={{
				__typename: 'Mutation',
				removeFromCart: {
					__typename: 'CartItem',
					id: props.id,
				},
			}}
		>
			{(removeFromCart, { loading, error }) => (
				<RemoveItemButton
					title='Delete Item'
					disabled={loading}
					onClick={() => {
						removeFromCart().catch((err) => alert(err.message));
					}}
				>
					Remove
				</RemoveItemButton>
			)}
		</Mutation>
	);
};

RemoveFromCart.propsTypes = {
	id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
