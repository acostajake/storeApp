import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import Cart from '../components/Cart';
import { CURRENT_USER, LOCAL_STATE_QUERY } from '../lib/queries';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const mocks = [
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
		request: { query: LOCAL_STATE_QUERY },
		result: { data: { cartOpen: true } },
	},
];

describe('<Cart/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Cart />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('header'))).toMatchSnapshot();
		expect(wrapper.find('CartItem')).toHaveLength(1);
	});
});
