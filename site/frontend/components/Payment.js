import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';

import { CREATE_ORDER, CURRENT_USER } from '../lib/queries';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User from './User';

function totalItems(cart) {
	return cart.reduce((total, item) => total + item.quantity, 0);
}

const Payment = (props) => {
	const onToken = async (res, createOrder) => {
		NProgress.start();
		const order = await createOrder({
			variables: {
				token: res.id,
			},
		}).catch((err) => {
			alert(err.message);
		});
		Router.push({
			pathname: '/order',
			query: { id: order.data.createOrder.id },
		});
	};

	return (
		<User>
			{({ data: { me } }) => (
				<Mutation
					mutation={CREATE_ORDER}
					refetchQueries={[{ query: CURRENT_USER }]}
				>
					{(createOrder) => (
						<StripeCheckout
							amount={calcTotalPrice(me.cart)}
							currency='USD'
							description={`Order of ${totalItems(me.cart)} items`}
							email={me.email}
							image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
							name='art-sale'
							stripeKey='pk_test_JJDkY4glpzPgjzLy5U7GMrQP00b34T6xTV'
							token={(res) => onToken(res, createOrder)}
						>
							{props.children}
						</StripeCheckout>
					)}
				</Mutation>
			)}
		</User>
	);
};

export default Payment;
