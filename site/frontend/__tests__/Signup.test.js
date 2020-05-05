import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { CURRENT_USER, SIGNUP_MUTATION } from '../lib/queries';
import { fakeUser } from '../lib/testUtils';
import Signup from '../components/Signup';

function type(wrapper, name, value) {
	wrapper.find(`input[name="${name}"]`).simulate('change', {
		target: { name, value },
	});
}

const me = fakeUser();

const signupMocks = [
	{
		request: {
			query: SIGNUP_MUTATION,
			variables: { name: me.name, email: me.email, password: 'secret' },
		},
		result: {
			data: {
				signup: {
					__typename: 'User',
					id: 'abc123',
					email: me.email,
					name: me.name,
				},
			},
		},
	},
	// CURRENT_USER mock
	{
		request: { query: CURRENT_USER },
		result: { data: { me } },
	},
];

describe('<Signup/>', () => {
	it('renders and matches snapshot', () => {
		const wrapper = mount(
			<MockedProvider>
				<Signup />
			</MockedProvider>
		);
		const form = wrapper.find('form');
		expect(toJSON(form)).toMatchSnapshot();
	});
	it('calls the mutation', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={signupMocks}>
				<ApolloConsumer>
					{(client) => {
						apolloClient = client;
						return <Signup />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		type(wrapper, 'name', me.name);
		type(wrapper, 'email', me.email);
		type(wrapper, 'password', 'secret');
		wrapper.update();
		wrapper.find('form').simulate('submit');
		await wait();
		const user = await apolloClient.query({ query: CURRENT_USER });
		expect(user.data.me).toMatchObject(me);
	});
});
