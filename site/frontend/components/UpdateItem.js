import Router from 'next/router';
import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';

import { UPDATE_ITEM_MUTATION, GET_ITEM } from '../lib/queries';
import Form from './styles/Form';

const UpdateItem = (props) => {
	const [item, setItemDetails] = useState({});

	const updateInput = (e) => {
		const {
			target: { name, type, value },
		} = e;
		const val = type === 'number' ? parseFloat(value) : value;
		setItemDetails({ ...item, [name]: val });
	};

	const handleUpdate = async (e, updateItemMutation) => {
		e.preventDefault();
		const res = await updateItemMutation({
			variables: {
				id: props.id,
				...item,
			},
		});
	};

	return (
		<Query query={GET_ITEM} variables={{ id: props.id }}>
			{({ data, loading }) => {
				if (loading) return <p>Updating item...</p>;
				if (!data.item) return <p>Whoops! Try again. No data for {props.id}</p>;
				return (
					<Mutation mutation={UPDATE_ITEM_MUTATION} variables={item}>
						{(updateItemMutation, { loading, error }) => (
							<Form onSubmit={(e) => handleUpdate(e, updateItemMutation)}>
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
											defaultValue={data.item.title}
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
											defaultValue={data.item.price}
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
											defaultValue={data.item.desc}
										/>
									</label>
									<button type='submit'>
										Sav{loading ? 'ing' : 'e'} Update
									</button>
								</fieldset>
							</Form>
						)}
					</Mutation>
				);
			}}
		</Query>
	);
};

export default UpdateItem;
