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
				if (error) return <ErrorMessage error={error} />;
				if (loading) return <p>Loading item...</p>;
				const item = data.item;
				if (!item) return <p>Nothing found for {props.id}</p>;
				return (
					<SingleStyle>
						<Head>
							<title>Store | {item.title}</title>
						</Head>
						<img src={item.largeImg} alt={`${item.title} image`} />
						<div>
							<h2 className='details'>Viewing {item.title}</h2>
							<p>{item.desc}</p>
						</div>
					</SingleStyle>
				);
			}}
		</Query>
	);
};

export default SingleItemDisplay;
