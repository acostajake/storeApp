import gql from 'graphql-tag';

export const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$desc: String!
		$image: String
		$largeImg: String
		$price: Int!
	) {
		createItem(
			title: $title
			desc: $desc
			image: $image
			largeImg: $largeImg
			price: $price
		) {
			id
		}
	}
`;

export const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

export const UPDATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$id: ID!
		$title: String
		$desc: String
		$price: Int
	) {
		updateItem(id: $id, title: $title, desc: $desc, price: $price) {
			id
			title
			desc
			price
		}
	}
`;

export const GET_ALL_ITEMS = gql`
	query GET_ALL_ITEMS {
		items {
			id
			title
			desc
			image
			largeImg
			price
		}
	}
`;

export const GET_ITEM = gql`
	query GET_ITEM($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			desc
			price
		}
	}
`;
