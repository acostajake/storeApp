import React from 'react';
import { Mutation, Query } from 'react-apollo';

import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../lib/queries';

import Button from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';

const Cart = () => {
	return (
		<Mutation mutation={TOGGLE_CART_MUTATION}>
			{(toggleCart) => (
				<Query query={LOCAL_STATE_QUERY}>
					{({ data }) => (
						<CartStyles open={data.cartOpen}>
							<header>
								<CloseButton title='close' onClick={toggleCart}>
									&times;
								</CloseButton>
								<Supreme>Your Cart</Supreme>
								<p>Items in your cart</p>
							</header>

							<footer>
								<p>Price</p>
								<Button>Checkout</Button>
							</footer>
						</CartStyles>
					)}
				</Query>
			)}
		</Mutation>
	);
};

export default Cart;
