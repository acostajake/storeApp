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
