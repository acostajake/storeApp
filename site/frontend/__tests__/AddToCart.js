import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import AddToCart from '../components/AddToCart';
import { ADD_TO_CART, CURRENT_USER } from '../lib/queries';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const addToCartMocks = [
	{
		request: { query: CURRENT_USER },
		result: {
			data: {
				me: {
					...fakeUser(),
					cart: [],
				},
			},
		},
	},
	{
		request: { query: CURRENT_USER },
		result: {
			data: {
				me: {
					...fakeUser(),
					cart: [fakeCartItem()],
				},
			},
		},
	},
	{
		request: { query: ADD_TO_CART, variables: { id: 'abc123' } },
		result: {
			data: {
				addToCart: {
					...fakeCartItem(),
					quantity: 1,
				},
			},
		},
	},
];

describe('<AddToCart/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<AddToCart />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});
	it('adds an item to cart on click', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={addToCartMocks}>
				<ApolloConsumer>
					{(client) => {
						apolloClient = client;
						return <AddToCart id='abc123' />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const {
			data: { me },
		} = await apolloClient.query({
			query: CURRENT_USER,
		});
		expect(me.cart).toHaveLength(0);
		wrapper.find('button').simulate('click');
		await wait();
		const {
			data: { me: me2 },
		} = await apolloClient.query({
			query: CURRENT_USER,
		});
		expect(me2.cart).toHaveLength(1);
		expect(me2.cart[0].id).toBe('omg123');
		expect(me2.cart[0].quantity).toBe(3);
	});
	it('changes text for loading state', async () => {
		const wrapper = mount(
			<MockedProvider mocks={addToCartMocks}>
				<AddToCart id='abc123' />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Add to cart');
		wrapper.find('button').simulate('click');
		expect(wrapper.text()).toContain('Adding');
	});
});
