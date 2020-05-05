import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import {
	makeMocksFor,
	notSignedInMocks,
	signedInMocks,
} from '../lib/testUtils';
import Pagination from '../components/Pagination';

Router.router = {
	push() {},
	prefetch() {},
};

describe('<Pagination/>', () => {
	it('displays a loading message', () => {
		const mountPagination = mount(
			<MockedProvider mocks={makeMocksFor(3)}>
				<Pagination />
			</MockedProvider>
		);
		expect(mountPagination.text()).toContain('Loading pages...');
	});
	it('renders pagination for 13 items', async () => {
		const mountPagination = mount(
			<MockedProvider mocks={makeMocksFor(13)}>
				<Pagination page={1} />
			</MockedProvider>
		);
		await wait();
		mountPagination.update();
		const pagination = mountPagination.find('[data-test="pagination"]');
		expect(toJSON(pagination)).toMatchSnapshot();
		expect(mountPagination.find('.totalPages').text()).toBe('4');
	});
	it('disables prev button on first page', async () => {
		const mountPagination = mount(
			<MockedProvider mocks={makeMocksFor(13)}>
				<Pagination page={1} />
			</MockedProvider>
		);
		await wait();
		mountPagination.update();
		const prev = mountPagination.find('a.prev');
		expect(prev.prop('aria-disabled')).toEqual(true);
	});
	it('disables next button on last page', async () => {
		const mountPagination = mount(
			<MockedProvider mocks={makeMocksFor(13)}>
				<Pagination page={4} />
			</MockedProvider>
		);
		await wait();
		mountPagination.update();
		const next = mountPagination.find('a.next');
		expect(next.prop('aria-disabled')).toEqual(true);
	});
	it('enables all buttons on middle page', async () => {
		const mountPagination = mount(
			<MockedProvider mocks={makeMocksFor(13)}>
				<Pagination page={2} />
			</MockedProvider>
		);
		await wait();
		mountPagination.update();
		const next = mountPagination.find('a.next');
		const prev = mountPagination.find('a.prev');
		expect(next.prop('aria-disabled')).toEqual(false);
		expect(prev.prop('aria-disabled')).toEqual(false);
	});
});
