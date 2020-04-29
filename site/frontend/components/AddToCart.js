import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART } from '../lib/queries';

const AddToCart = (props) => {
	const { id } = props;

	return (
		<Mutation mutation={ADD_TO_CART} variables={id}>
			{(addToCart) => <button onClick={addToCart}>Add to cart</button>}
		</Mutation>
	);
};

export default AddToCart;
