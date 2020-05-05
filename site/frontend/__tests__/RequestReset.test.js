import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { requestResetMock } from '../lib/testUtils';
import RequestReset from '../components/RequestReset';

describe('<RequestReset/>', () => {
	it('renders and matches snapshot', async () => {
		const mountedReqReset = mount(
			<MockedProvider mocks={requestResetMock}>
				<RequestReset />
			</MockedProvider>
		);
		await wait();
		mountedReqReset.update();
		const form = mountedReqReset.find('[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});
	it('calls the mutation', async () => {
		const mountedReqReset = mount(
			<MockedProvider mocks={requestResetMock}>
				<RequestReset />
			</MockedProvider>
		);
		const success = 'Success! Use the link sent to your email to reset.';
		mountedReqReset.find('input').simulate('change', {
			target: { name: 'email', value: 'test@fakeemail.com' },
		});
		mountedReqReset.find('form').simulate('submit');
		await wait();
		mountedReqReset.update();
		expect(mountedReqReset.find('p').text()).toContain(success);
	});
});
