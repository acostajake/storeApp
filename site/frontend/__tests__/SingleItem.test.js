import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import SingleItemDisplay from '../components/SingleItemDisplay';
import { GET_ITEM_WITH_IMAGE } from '../lib/queries';
import { fakeItem } from '../lib/testUtils';

const mocks = [
	{
		request: { query: GET_ITEM_WITH_IMAGE, variables: { id: '123' } },
		result: { data: { item: fakeItem() } },
	},
];

describe('<SingleItemDisplay/>', () => {
	it('renders with loading state', async () => {
		const mountItem = mount(
			<MockedProvider mocks={mocks}>
				<SingleItemDisplay id='123' />
			</MockedProvider>
		);
		expect(mountItem.text()).toContain('Loading item...');
	});
	it('renders with data', async () => {
		const mountItem = mount(
			<MockedProvider mocks={mocks}>
				<SingleItemDisplay id='123' />
			</MockedProvider>
		);
		await wait();
		mountItem.update();
		expect(toJSON(mountItem.find('h2'))).toMatchSnapshot();
		expect(toJSON(mountItem.find('img'))).toMatchSnapshot();
		expect(toJSON(mountItem.find('p'))).toMatchSnapshot();
	});
	it('errors with unfound item id', async () => {
		const errorMsg = {};
		const badMocks = [
			{
				request: { query: GET_ITEM_WITH_IMAGE, variables: { id: '123' } },
				result: { errors: [{ message: 'Item not found' }] },
			},
		];
		const mountItem = mount(
			<MockedProvider mocks={badMocks}>
				<SingleItemDisplay id='123' />
			</MockedProvider>
		);
		await wait();
		mountItem.update();
		const itemError = mountItem.find('[data-test="graphql-error"]');
		expect(toJSON(itemError)).toMatchSnapshot();
		expect(itemError.text()).toContain('Item not found');
	});
});
