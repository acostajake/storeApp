import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

const Item = (props) => {
	const {
		item: { desc, id, image, price, title },
	} = props;
	return (
		<ItemStyles>
			{image && <img src={image} alt='Wish you could see this!' />}
			<Title>
				<Link
					href={{
						pathname: '/item',
						query: id,
					}}
				>
					<a>{title}</a>
				</Link>
			</Title>
			<PriceTag>${price}</PriceTag>
			<p>{desc}</p>
			<div className='buttonList'>
				<Link href={{ pathname: 'update', query: { id } }}>
					<a>Edit</a>
				</Link>
				<button>Add to cart</button>
				<button>Delete</button>
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
