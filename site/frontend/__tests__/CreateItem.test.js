import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import CreateItem from '../components/CreateItem';
import { CREATE_ITEM_MUTATION } from '../lib/queries';
import { createItemMock, fakeItem } from '../lib/testUtils';

const dogImage = 'https://dog.com/dog.jpg';

global.fetch = jest.fn().mockResolvedValue({
	json: () => ({
		secure_url: dogImage,
		eager: [{ secure_url: dogImage }],
	}),
});

describe('<CreateItem/>', () => {
	it('matches snapshot', () => {
		const mountedCreateItem = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);
		const form = mountedCreateItem.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});
	it('uploads a file when changed', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);
		const input = wrapper.find('input[type="file"]');
		input.simulate('change', { target: { files: ['fakedog.jpg'] } });
		await wait();
		const component = wrapper.find('CreateItem').instance();
		expect(component.state.image).toEqual(dogImage);
		expect(component.state.largeImg).toEqual(dogImage);
		expect(global.fetch).toHaveBeenCalled();
		global.fetch.mockReset();
	});
	it('can update state by typing', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);
		wrapper
			.find('#title')
			.simulate('change', { target: { value: 'Test', name: 'title' } });
		wrapper
			.find('#price')
			.simulate('change', { target: { value: '50000', name: 'price' } });
		wrapper.find('#description').simulate('change', {
			target: { value: 'This is awesome!', name: 'desc' },
		});
		expect(wrapper.find('CreateItem').instance().state).toMatchObject({
			title: 'Test',
			price: '50000',
			desc: 'This is awesome!',
			image: '',
			largeImg: '',
		});
	});
	it('creates an item on submit', async () => {
		const item = fakeItem();
		const createItemMock = [
			{
				request: {
					query: CREATE_ITEM_MUTATION,
					variables: {
						title: item.title,
						desc: item.desc,
						image: '',
						largeImg: '',
						price: item.price,
					},
				},
				result: {
					data: {
						createItem: {
							...fakeItem,
							id: '12345',
							__typeName: 'Item',
						},
					},
				},
			},
		];
		const wrapper = mount(
			<MockedProvider mocks={createItemMock}>
				<CreateItem />
			</MockedProvider>
		);
		wrapper
			.find('#title')
			.simulate('change', { target: { value: item.title, name: 'title' } });
		wrapper
			.find('#price')
			.simulate('change', { target: { value: item.price, name: 'price' } });
		wrapper.find('#description').simulate('change', {
			target: { value: item.desc, name: 'desc' },
		});
		expect(wrapper.find('CreateItem').instance().state).toMatchObject({
			title: item.title,
			price: item.price,
			desc: item.desc,
			image: '',
			largeImg: '',
		});
		Router.router = { push: jest.fn() };
		wrapper.find('form').simulate('submit');
		await wait(100);
		expect(Router.router.push).toHaveBeenCalledWith({
			pathname: '/item',
			query: { id: '12345' },
		});
	});
});
