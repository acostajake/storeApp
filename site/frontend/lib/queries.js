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

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
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
