import gql from 'graphql-tag';

import { perPage } from '../config';

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

export const ADD_TO_CART = gql`
	mutation addToCart($id: ID!) {
		addToCart(id: $id) {
			id
			quantity
		}
	}
`;

export const REMOVE_FROM_CART = gql`
	mutation removeFromCart($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

export const CREATE_ORDER = gql`
	mutation createOrder($token: String!) {
		createOrder(token: $token) {
			id
			charge
			total
			items {
				id
				title
			}
		}
	}
`;

export const SINGLE_ORDER_QUERY = gql`
	query SINGLE_ORDER_QUERY($id: ID!) {
		order(id: $id) {
			id
			charge
			total
			createdAt
			user {
				id
			}
			items {
				id
				title
				desc
				image
				price
				quantity
			}
		}
	}
`;

export const ALL_ORDERS_QUERY = gql`
	query ALL_ORDERS_QUERY {
		orders(orderBy: createdAt_DESC) {
			id
			total
			createdAt
			items {
				id
				title
				price
				desc
				quantity
				image
			}
		}
	}
`;

export const TOGGLE_CART_MUTATION = gql`
	mutation {
		toggleCart @client
	}
`;

export const GET_ALL_ITEMS = gql`
	query GET_ALL_ITEMS($skip: Int = 0, $first: Int = ${perPage}) {
		items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

export const GET_ITEM_WITH_IMAGE = gql`
	query GET_ITEM_WITH_IMAGE($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			desc
			largeImg
		}
	}
`;

export const SEARCH_FOR_ITEM = gql`
	query SEARCH_FOR_ITEM($searchTerm: String!) {
		items(
			where: {
				OR: [{ title_contains: $searchTerm }, { desc_contains: $searchTerm }]
			}
		) {
			id
			title
			image
		}
	}
`;

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`;

export const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client
	}
`;

// Auth
export const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$resetToken: String!
		$password: String!
		$confirmPassword: String!
	) {
		resetPassword(
			resetToken: $resetToken
			password: $password
			confirmPassword: $confirmPassword
		) {
			id
			name
			email
		}
	}
`;

export const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

export const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$name: String!
		$email: String!
		$password: String!
	) {
		signup(name: $name, email: $email, password: $password) {
			id
			name
			email
		}
	}
`;

export const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			name
			email
		}
	}
`;

export const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		signout {
			message
		}
	}
`;

export const UPDATE_PERMISSIONS_MUTATION = gql`
	mutation updatePermissions($permissions: [Permission], $userId: ID!) {
		updatePermissions(permissions: $permissions, userId: $userId) {
			id
			permissions
			name
			email
		}
	}
`;

export const CURRENT_USER = gql`
	query {
		me {
			id
			email
			name
			permissions
			orders {
				id
			}
			cart {
				id
				quantity
				item {
					id
					price
					image
					title
					desc
				}
			}
		}
	}
`;

export const GET_ALL_USERS = gql`
	query {
		users {
			id
			name
			email
			permissions
		}
	}
`;
