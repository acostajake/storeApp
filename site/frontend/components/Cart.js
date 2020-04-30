import React from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';

import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../lib/queries';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

import Button from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';

import CartItem from './CartItem';
import Payment from './Payment';
import User from './User';

const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => (
		<Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
	),
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => (
	<Composed>
		{({ user, toggleCart, localState }) => {
			const me = user.data.me;
			if (!me) return null;
			return (
				<CartStyles open={localState.data.cartOpen}>
					<header>
						<CloseButton title='close' onClick={toggleCart}>
							&times;
						</CloseButton>
						<Supreme>{me.name}'s Cart</Supreme>
						<p>
							{me.cart.length} item{me.cart.length !== 1 ? 's' : null} in your
							cart
						</p>
					</header>
					<ul>
						{me.cart.map((cartItem) => (
							<CartItem key={cartItem.id} cartItem={cartItem} />
						))}
					</ul>
					<footer>
						<p>{formatMoney(calcTotalPrice(me.cart))}</p>
						{me.cart.length && (
							<Payment>
								<Button>Checkout</Button>
							</Payment>
						)}
					</footer>
				</CartStyles>
			);
		}}
	</Composed>
);

export default Cart;
