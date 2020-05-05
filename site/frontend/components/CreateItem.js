import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_ITEM_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import Error from './ErrorMessage';

class CreateItem extends Component {
	state = {
		title: '',
		desc: '',
		image: '',
		largeImg: '',
		price: 0,
	};

	updateInput = (e) => {
		const {
			target: { name, type, value },
		} = e;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	uploadImage = async (e) => {
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
		this.setState({
			image: file.secure_url,
			largeImg: file.eager[0].secure_url,
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						data-test='form'
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
									onChange={this.uploadImage}
								/>
								{this.state.image && (
									<img
										width='160px'
										src={this.state.image}
										alt='Image preview'
									/>
								)}
							</label>
							<label htmlFor='title'>
								Title
								<input
									disabled={loading}
									type='text'
									id='title'
									name='title'
									placeholder='Title'
									required
									onChange={this.updateInput}
									value={this.state.title}
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
									onChange={this.updateInput}
									value={this.state.price}
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
									onChange={this.updateInput}
									value={this.state.desc}
								/>
							</label>
							<button type='submit'>Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreateItem;
