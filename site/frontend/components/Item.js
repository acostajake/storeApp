import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import ItemStyles from './styles/ItemStyles';
import DeleteItem from './DeleteItem';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

const Item = (props) => {
	const {
		item: { desc, id, image, price, title },
	} = props;
	return (
		<ItemStyles>
			{image && <img src={image} alt={title} />}
			<Title>
				<Link
					href={{
						pathname: '/item',
						query: { id },
					}}
				>
					<a>{title}</a>
				</Link>
			</Title>
			<PriceTag>{formatMoney(price)}</PriceTag>
			<p>{desc}</p>
			<div className='buttonList'>
				<Link href={{ pathname: 'update', query: { id } }}>
					<a>Edit Item</a>
				</Link>
				<AddToCart id={id} />
				<DeleteItem id={id}>Delete Item</DeleteItem>
			</div>
		</ItemStyles>
	);
};

Item.propTypes = {
	item: PropTypes.shape({
		desc: PropTypes.string,
		id: PropTypes.string,
		image: PropTypes.string,
		price: PropTypes.number,
		title: PropTypes.string,
	}).isRequired,
};

export default Item;
