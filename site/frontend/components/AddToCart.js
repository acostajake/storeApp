import React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART, CURRENT_USER } from '../lib/queries';

const AddToCart = (props) => {
	const { id } = props;

	return (
		<Mutation
			mutation={ADD_TO_CART}
			variables={{ id }}
			refetchQueries={[{ query: CURRENT_USER }]}
		>
			{(addToCart, { loading }) => (
				<button onClick={addToCart} disabled={loading}>
					Add{loading && 'ing'} to cart
				</button>
			)}
		</Mutation>
	);
};

export default AddToCart;
