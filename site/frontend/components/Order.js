import { format } from 'date-fns';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import formatMoney from '../lib/formatMoney';
import { SINGLE_ORDER_QUERY } from '../lib/queries';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const Order = (props) => {
	return (
		<Query query={SINGLE_ORDER_QUERY} variables={{ id: props.id }}>
			{({ data, loading, error }) => {
				if (error) return <Error error={error} />;
				if (loading) return <p>Loading...</p>;
				const order = data.order;
				return (
					<OrderStyles>
						<Head>
							<title>Maker Store | Order</title>
						</Head>
						<p>
							<span>Order ID: </span>
							<span>{order.id}</span>
						</p>
						<p>
							<span>Charge:</span>
							<span>{order.charge}</span>
						</p>
						<p>
							<span>Ordered at:</span>
							<span>
								{format(Date.parse(order.createdAt), 'MMMM d, yyyy h:mm a')}
							</span>
						</p>
						<p>
							<span>Order total</span>
							<span>{formatMoney(order.total)}</span>
						</p>
						<p>
							<span>Total Items</span>
							<span>{order.items.length}</span>
						</p>
						{order.items.map((each) => (
							<div className='order.item' key={each.id}>
								<img width='150' src={each.image} alt={each.title} />
								<div className='item-details'>
									<h2>{each.title}</h2>
									<p>Qty: {each.quantity}</p>
									<p>Price: {formatMoney(each.price)}</p>
									<p>Subtotal: {formatMoney(each.price * each.quantity)}</p>
									<p>{each.desc}</p>
								</div>
							</div>
						))}
					</OrderStyles>
				);
			}}
		</Query>
	);
};

Order.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Order;
