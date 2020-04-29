import React from 'react';
import { Mutation, Query } from 'react-apollo';

import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../lib/queries';
import calcTotalPrice from '../lib/calcTotalPrice';

import CartItem from './CartItem';
import Button from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import User from './User';

const Cart = () => {
	return (
		<User>
			{({ data: { me } }) => {
				if (!me) return null;
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
											<Supreme>{me.name}'s Cart</Supreme>
											<p>
												{me.cart.length} item{me.cart.length !== 1 ? 's' : null}{' '}
												in your cart
											</p>
										</header>
										<ul>
											{me.cart.map((cartItem) => (
												<CartItem key={cartItem.id} cartItem={cartItem} />
											))}
										</ul>
										<footer>
											<p>${calcTotalPrice(me.cart)}</p>
											<Button>Checkout</Button>
										</footer>
									</CartStyles>
								)}
							</Query>
						)}
					</Mutation>
				);
			}}
		</User>
	);
};

export default Cart;
