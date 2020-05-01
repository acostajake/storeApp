import { format, formatDistance } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import formatMoney from '../lib/formatMoney';
import { ALL_ORDERS_QUERY } from '../lib/queries';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import User from './User';

const OrderUl = styled.ul`
	display: grid;
	grid-gap: 4rem;
	grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

const OrderList = (props) => {
	return (
		<User>
			{({ data: { me } }) => (
				<Query query={ALL_ORDERS_QUERY}>
					{({ data: { orders }, loading, error }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <Error error={error} />;
						return (
							<div>
								<h2>
									Showing {orders.length} orders for {me.name}
								</h2>
								<OrderUl>
									{orders.map((order) => (
										<OrderItemStyles key={order.id}>
											<Link
												href={{
													pathname: '/order',
													query: { id: order.id },
												}}
											>
												<a>
													<center>
														{format(
															Date.parse(order.createdAt),
															'MMMM d, yyyy'
														)}
													</center>
													<center>{formatMoney(order.total)}</center>
													<div className='order-meta'>
														<p>
															{order.items.reduce((a, b) => a + b.quantity, 0)}{' '}
															Items
														</p>
													</div>
													<div className='images'>
														{order.items.map((item) => (
															<img
																key={item.id}
																src={item.image}
																alt={item.title}
															/>
														))}
													</div>
												</a>
											</Link>
										</OrderItemStyles>
									))}
								</OrderUl>
							</div>
						);
					}}
				</Query>
			)}
		</User>
	);
};

export default OrderList;
