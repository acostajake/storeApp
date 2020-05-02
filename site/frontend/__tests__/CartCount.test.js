import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import CartCount from '../components/CartCount';

const shallowCount = shallow(<CartCount count={4} />);

describe('<CartCount/>', () => {
	it('matches snapshot', () => {
		expect(toJSON(shallowCount)).toMatchSnapshot();
	});
	it('updates via props', () => {
		expect(toJSON(shallowCount)).toMatchSnapshot();
		shallowCount.setProps({ count: 7 });
		expect(toJSON(shallowCount)).toMatchSnapshot();
	});
});
