import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import SignInWrapper from '../components/SignInWrapper';
import {
	notSignedInMocks,
	signedInMocks,
	signedInWithCartMocks,
} from '../lib/testUtils';

const Child = () => <p>Child</p>;

describe('<SignInWrapper/>', () => {
	it('matches a snapshot', () => {});
	it('renders sign in text for logged out users', async () => {
		const mountNotSignedIn = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<SignInWrapper>
					<Child />
				</SignInWrapper>
			</MockedProvider>
		);

		await wait();
		mountNotSignedIn.update();
		expect(mountNotSignedIn.text()).toContain('Please sign in to continue');
		expect(mountNotSignedIn.text()).not.toContain('Child');
		expect(mountNotSignedIn.find('Signin').exists()).toBe(true);
	});

	it('renders child component when user is signed in', async () => {
		const mountSignedIn = mount(
			<MockedProvider mocks={signedInWithCartMocks}>
				<SignInWrapper>
					<Child />
				</SignInWrapper>
			</MockedProvider>
		);

		await wait();
		mountSignedIn.update();
		expect(mountSignedIn.text()).toContain('Child');
	});
});
