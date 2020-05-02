import formatMoney from '../lib/formatMoney';

describe('format money test', () => {
	it('works with fractional dollars', () => {
		expect(formatMoney(1)).toEqual('$0.01');
		expect(formatMoney(30)).toEqual('$0.30');
		expect(formatMoney(45)).toEqual('$0.45');
	});

	it('leaves cents off of whole dollar values', () => {
		expect(formatMoney(10000)).toEqual('$100');
		expect(formatMoney(300)).toEqual('$3');
	});

	it('works with dollars and cents', () => {
		expect(formatMoney(12345)).toEqual('$123.45');
		expect(formatMoney(112233440099)).toEqual('$1,122,334,400.99');
	});
});
