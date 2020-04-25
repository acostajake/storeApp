import Head from 'next/head';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { GET_ITEM_WITH_IMAGE } from '../lib/queries';
import ErrorMessage from './ErrorMessage';

const SingleStyle = styled.div`
	max-width: 1200px;
	margin: 2rem 0 auto;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

const SingleItemDisplay = (props) => {
	return (
		<Query
			query={GET_ITEM_WITH_IMAGE}
			variables={{
				id: props.id,
			}}
		>
			{({ data, error, loading }) => {
				const {
					item: { desc, largeImg, title },
				} = data;
				if (error) return <ErrorMessage error={error.message} />;
				if (loading) return <p>Loading item...</p>;
				if (!data.item) return <p>Nothing found for {props.id}</p>;
				return (
					<SingleStyle>
						<Head>
							<title>Store | {title}</title>
						</Head>
						<img src={largeImg} alt={`${title} image`} />
						<div>
							<h2 className='details'>Viewing {title}</h2>
							<p>{desc}</p>
						</div>
					</SingleStyle>
				);
			}}
		</Query>
	);
};

export default SingleItemDisplay;
