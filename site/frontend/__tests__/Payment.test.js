import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { CREATE_ORDER, CURRENT_USER } from '../lib/queries';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import Payment from '../components/Payment';

Router.router = { push: jest.fn() };

const paymentMocks = [
	{
		request: { query: CURRENT_USER },
		result: { data: { me: { ...fakeUser(), cart: [fakeCartItem()] } } },
	},
];

describe('<Payment/>', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={paymentMocks}>
				<Payment />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const checkout = wrapper.find('ReactStripeCheckout');
		expect(toJSON(checkout)).toMatchSnapshot();
	});
	it('creates an order when a token is created', async () => {
		const createOrderMock = jest.fn().mockResolvedValue({
			data: { createOrder: { id: 'xyz789' } },
		});
		const wrapper = mount(
			<MockedProvider mocks={paymentMocks}>
				<Payment />
			</MockedProvider>
		);
		const component = wrapper.find('Payment').instance();
		component.onToken({ id: 'abc123' }, createOrderMock);
		expect(createOrderMock).toHaveBeenCalledWith({
			variables: { token: 'abc123' },
		});
	});
	it('turns on the nprogress bar', async () => {
		const wrapper = mount(
			<MockedProvider mocks={paymentMocks}>
				<Payment />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		NProgress.start = jest.fn();
		const createOrderMock = jest.fn().mockResolvedValue({
			data: { createOrder: { id: 'xyz789' } },
		});
		const component = wrapper.find('Payment').instance();
		component.onToken({ id: 'abc123' }, createOrderMock);
		expect(NProgress.start).toHaveBeenCalled();
	});
	it('should route to order page when order completed', async () => {
		const createOrderMock = jest.fn().mockResolvedValue({
			data: { createOrder: { id: 'xyz789' } },
		});
		const wrapper = mount(
			<MockedProvider mocks={paymentMocks}>
				<Payment />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const component = wrapper.find('Payment').instance();
		component.onToken({ id: 'abc123' }, createOrderMock);
		expect(Router.router.push).toHaveBeenCalledWith({
			pathname: '/order',
			query: { id: 'xyz789' },
		});
	});
});
