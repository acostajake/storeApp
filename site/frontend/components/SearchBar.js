import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash/debounce';
import Router from 'next/router';
import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

import { SEARCH_FOR_ITEM } from '../lib/queries';

const SearchBar = () => {
	const [items, setItems] = useState([]);
	const [loading, toggleLoading] = useState(false);

	const handleChange = debounce(async (e, client) => {
		toggleLoading(true);
		const res = await client.query({
			query: SEARCH_FOR_ITEM,
			variables: { searchTerm: e.target.value },
		});
		setItems([...res.data.items]);
		toggleLoading(false);
	}, 350);

	const routeToItem = (item) => {
		Router.push({
			pathname: '/item',
			query: { id: item.id },
		});
	};
	resetIdCounter();
	return (
		<SearchStyles>
			<Downshift
				itemToString={(item) => (item === null ? '' : item.title)}
				onChange={routeToItem}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
					inputValue,
					highlightedIndex,
				}) => (
					<div>
						<ApolloConsumer>
							{(client) => (
								<input
									{...getInputProps({
										type: 'search',
										placeholder: 'Search for something',
										className: loading ? 'loading' : '',
										id: 'search',
										onChange: (e) => {
											e.persist();
											handleChange(e, client);
										},
									})}
								/>
							)}
						</ApolloConsumer>
						{isOpen && (
							<DropDown>
								{items.map((item, index) => (
									<DropDownItem
										{...getItemProps({ item })}
										key={item.id}
										highlighted={index === highlightedIndex}
									>
										<img width='50' src={item.image} alt={item.title} />
										{item.title}
									</DropDownItem>
								))}
								{!items.length && !loading && (
									<DropDownItem>No items found for {inputValue}</DropDownItem>
								)}
							</DropDown>
						)}
					</div>
				)}
			</Downshift>
		</SearchStyles>
	);
};

export default SearchBar;
