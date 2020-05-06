import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import RemoveFromCart from '../components/RemoveFromCart';
import { CURRENT_USER, REMOVE_FROM_CART } from '../lib/queries';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

global.alert = console.log;

const removeFromCartMocks = [
	{
		request: { query: CURRENT_USER },
		result: {
			data: {
				me: {
					...fakeUser(),
					cart: [fakeCartItem({ id: 'abc123' })],
				},
			},
		},
	},
	{
		request: { query: REMOVE_FROM_CART, variables: { id: 'abc123' } },
		result: {
			data: {
				removeFromCart: {
					__typename: 'CartItem',
					id: 'abc123',
				},
			},
		},
	},
];

describe('<RemoveFromCart/>', () => {
	it('renders and matches snapshot', () => {
		const wrapper = mount(
			<MockedProvider>
				<RemoveFromCart />
			</MockedProvider>
		);
		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});
	it('removes an item on click', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={removeFromCartMocks}>
				<ApolloConsumer>
					{(client) => {
						apolloClient = client;
						return <RemoveFromCart id='abc123' />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		const res = await apolloClient.query({
			query: CURRENT_USER,
		});
		const {
			data: { me },
		} = res;
		expect(me.cart).toHaveLength(1);
		expect(me.cart[0].item.price).toBe(5000);
		wrapper.find('button').simulate('click');
		await wait();
		wrapper.update();
		const res2 = await apolloClient.query({
			query: CURRENT_USER,
		});
		const {
			data: { me: me2 },
		} = res2;
		expect(me.cart).toHaveLength(0);
	});
});
