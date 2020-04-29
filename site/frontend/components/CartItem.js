import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid ${(props) => props.theme.lighgrey};
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right: 10px;
	}
	h3,
	p {
		margin: 0;
	}
`;

const CartItem = ({ cartItem }) => {
	if (!cartItem.item)
		return (
			<CartItemStyles>
				Item has been removed from the site.
				<RemoveFromCart id={cartItem.id} />
			</CartItemStyles>
		);
	return (
		<CartItemStyles>
			<img width='100' src={cartItem.item.image} alt={cartItem.item.title} />
			<div className='cart-item-details'>
				<h3>{cartItem.item.title}</h3>
				<p>
					Total ${cartItem.item.price * cartItem.quantity}
					{' - '}
					<em>
						{cartItem.quantity}&times;{cartItem.item.price}/ea
					</em>
				</p>
			</div>
			<RemoveFromCart id={cartItem.id} />
		</CartItemStyles>
	);
};

CartItem.propTypes = {
	cartItem: PropTypes.shape({
		id: PropTypes.string,
		quantity: PropTypes.number,
		item: PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			image: PropTypes.string,
			price: PropTypes.number,
			desc: PropTypes.string,
		}),
	}).isRequired,
};

export default CartItem;