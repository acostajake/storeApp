import { shallow } from 'enzyme';
import formatMoney from '../lib/formatMoney';
import Item from '../components/Item';
import toJSON from 'enzyme-to-json';

const demoItem = {
	id: 'demo123',
	name: 'Sample Item',
	price: 3000,
	desc: 'First item',
	image: 'demo.png',
	largeImg: 'largeDemo.png',
};

const demoWrapper = shallow(<Item item={demoItem} />);

describe('<Item/>', () => {
	it('handles the price', () => {
		const priceTag = demoWrapper.find('PriceTag');
		expect(priceTag).toHaveLength(1);
		expect(priceTag.children().text()).toEqual(formatMoney(demoItem.price));
	});
	it('displays the item image', () => {
		const img = demoWrapper.find('img');
		expect(img).toHaveLength(1);
		expect(img.props().src).toEqual(demoItem.image);
		expect(img.props().alt).toEqual(demoItem.title);
	});
	it('displays buttons', () => {
		const buttons = demoWrapper.find('.buttonList');
		expect(buttons.children()).toHaveLength(3);
		expect(buttons.find('Link').exists()).toBe(true);
		expect(buttons.find('AddToCart').exists()).toBe(true);
		expect(buttons.find('DeleteItem').exists()).toBe(true);
	});
});
