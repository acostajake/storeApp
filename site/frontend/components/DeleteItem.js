import React from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_ITEM_MUTATION, GET_ALL_ITEMS } from '../lib/queries';

// TODO: Swap for React Hook AFTER updating react-apollo w Client
class DeleteItem extends React.Component {
	update = (cache, payload) => {
		const data = cache.readQuery({ query: GET_ALL_ITEMS });
		data.items = data.items.filter(
			(item) => item.id !== payload.data.deleteItem.id
		);
		cache.writeQuery({ query: GET_ALL_ITEMS, data });
	};
	render() {
		return (
			<Mutation
				mutation={DELETE_ITEM_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
			>
				{(deleteItem, { error }) => (
					<button
						onClick={() => {
							if (confirm('Ready to delete?')) {
								deleteItem().catch((error) => alert(error.message));
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteItem;
