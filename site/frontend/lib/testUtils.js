import casual from 'casual';
import {
	CURRENT_USER,
	PAGINATION_QUERY,
	REQUEST_RESET_MUTATION,
} from './queries';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
	__typename: 'Item',
	id: 'abc123',
	price: 5000,
	user: null,
	image: 'dog-small.jpg',
	title: 'dogs are best',
	desc: 'dogs',
	largeImg: 'dog.jpg',
});

const fakeUser = () => ({
	__typename: 'User',
	id: '4234',
	name: casual.name,
	email: casual.email,
	permissions: ['ADMIN'],
	orders: [],
	cart: [],
});

const fakeOrderItem = () => ({
	__typename: 'OrderItem',
	id: casual.uuid,
	image: `${casual.word}.jpg`,
	title: casual.words(),
	price: 4234,
	quantity: 1,
	desc: casual.words(),
});

const fakeOrder = () => ({
	__typename: 'Order',
	id: 'ord123',
	charge: 'ch_123',
	total: 40000,
	items: [fakeOrderItem(), fakeOrderItem()],
	createdAt: '2018-04 - 06T19: 24: 16.000Z',
	user: fakeUser(),
});

const fakeCartItem = (overrides) => ({
	__typename: 'CartItem',
	id: 'omg123',
	quantity: 3,
	item: fakeItem(),
	user: fakeUser(),
	...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value.toString();
	}

	removeItem(key) {
		delete this.store[key];
	}
}

const notSignedInMocks = [
	{
		request: { query: CURRENT_USER },
		result: { data: { me: null } },
	},
];

const signedInMocks = [
	{
		request: { query: CURRENT_USER },
		result: { data: { me: fakeUser() } },
	},
];

const signedInWithCartMocks = [
	{
		request: { query: CURRENT_USER },
		result: {
			data: {
				me: {
					...fakeUser(),
					cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
				},
			},
		},
	},
];

const makeMocksFor = (length) => {
	return [
		{
			request: { query: PAGINATION_QUERY },
			result: {
				data: {
					itemsConnection: {
						__typename: 'aggregate',
						aggregate: {
							__typename: 'count',
							count: length,
						},
					},
				},
			},
		},
	];
};

const requestResetMock = [
	{
		request: {
			query: REQUEST_RESET_MUTATION,
			variables: { email: 'test@fakeemail.com' },
		},
		result: {
			data: {
				requestReset: {
					message: 'success',
					__typename: 'Message',
				},
			},
		},
	},
];

export {
	LocalStorageMock,
	fakeItem,
	fakeUser,
	fakeCartItem,
	fakeOrder,
	fakeOrderItem,
	notSignedInMocks,
	requestResetMock,
	signedInMocks,
	signedInWithCartMocks,
	makeMocksFor,
};
