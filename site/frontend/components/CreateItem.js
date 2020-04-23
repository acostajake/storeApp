import Router from 'next/router';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_ITEM_MUTATION } from '../lib/queries';
import Form from './styles/Form';

const CreateItem = (props) => {
	const [item, setItemDetails] = useState({
		title: '',
		desc: '',
		image: '',
		largeImg: '',
		price: 0,
	});

	const updateInput = (e) => {
		const {
			target: { name, value },
		} = e;
		setItemDetails({ ...item, [name]: value });
	};

	return (
		<Mutation mutation={CREATE_ITEM_MUTATION} variables={item}>
			{(createItem, { loading, error }) => (
				<Form
					onSubmit={async (e) => {
						e.preventDefault();
						const res = await createItem();
						Router.push({
							pathname: '/item',
							query: { id: res.data.createItem.id },
						});
					}}
				>
					<h2>Sell Item</h2>
					<fieldset disabled={loading} aria-busy={loading}>
						<label htmlFor='title'>
							Title
							<input
								type='text'
								id='title'
								name='title'
								placeholder='Title'
								required
								onChange={(e) => updateInput(e)}
								value={item.value}
							/>
						</label>
						<label htmlFor='price'>
							Price
							<input
								type='text'
								id='price'
								name='price'
								placeholder='Price'
								required
								onChange={(e) => updateInput(e)}
								value={item.price}
							/>
						</label>
						<label htmlFor='description'>
							Description
							<textarea
								type='text'
								id='description'
								name='desc'
								placeholder='Description'
								required
								onChange={(e) => updateInput(e)}
								value={item.desc}
							/>
						</label>
						<button type='submit'>Submit</button>
					</fieldset>
				</Form>
			)}
		</Mutation>
	);
};

export default CreateItem;
