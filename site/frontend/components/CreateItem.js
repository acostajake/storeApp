import Router from 'next/router';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_ITEM_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CreateItem = () => {
	const [item, setItemDetails] = useState({
		title: '',
		desc: '',
		image: '',
		largeImg: '',
		price: '',
	});

	const updateInput = (e) => {
		const {
			target: { name, type, value },
		} = e;
		const val = type === 'number' ? parseFloat(value) : value;
		setItemDetails({ ...item, [name]: val });
	};

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'storeApp');
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/jakefromsnakefarm/image/upload',
			{
				method: 'POST',
				body: data,
			}
		);
		const file = await res.json();
		setItemDetails({
			image: file.secure_url,
			largeImg: file.eager[0].secure_url,
		});
	};

	return (
		<Mutation mutation={CREATE_ITEM_MUTATION} variables={{ ...item }}>
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
					<Error error={error} />
					<fieldset disabled={loading} aria-busy={loading}>
						<label htmlFor='image'>
							Add Image
							<input
								type='file'
								id='file'
								name='image'
								placeholder='Add an image'
								onChange={(e) => uploadImage(e)}
							/>
							{item.image && (
								<img width='160px' src={item.image} alt='Image preview' />
							)}
						</label>
						<label htmlFor='title'>
							Title
							<input
								type='text'
								id='title'
								name='title'
								placeholder='Title'
								required
								onChange={(e) => updateInput(e)}
								value={item.title}
							/>
						</label>
						<label htmlFor='price'>
							Price
							<input
								type='number'
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
