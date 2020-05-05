import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import {
	signedInWithCartMocks,
	notSignedInMocks,
	signedInMocks,
} from '../lib/testUtils';
import Nav from '../components/Nav';

describe('<Nav/>', () => {
	it('renders a simple Nav when not logged in', async () => {
		const notLoggedInNav = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		notLoggedInNav.update();
		const nav = notLoggedInNav.find('ul[data-test="nav"]');
		expect(toJSON(nav)).toMatchSnapshot();
	});
	it('renders a simple Nav when not logged in', async () => {
		const loggedInNav = mount(
			<MockedProvider mocks={signedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		loggedInNav.update();
		const navBar = loggedInNav.find('ul[data-test="nav"]');
		expect(toJSON(navBar)).toMatchSnapshot();
	});
	it('renders the amount of items in a cart', async () => {
		const loggedInNav = mount(
			<MockedProvider mocks={signedInWithCartMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		loggedInNav.update();
		const count = loggedInNav.find('div.count');
		const nav = loggedInNav.find('[data-test="nav"]');
		expect(count.text()).toBe('9');
		expect(nav.children().length).toBe(7);
		expect(nav.last().text()).toContain('Sign Out');
	});
});
