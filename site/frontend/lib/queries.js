import gql from 'graphql-tag';

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
