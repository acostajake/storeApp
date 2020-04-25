import SingleItemDisplay from '../components/SingleItemDisplay';

const Item = (props) => {
	return (
		<div>
			<SingleItemDisplay id={props.query.id} />
		</div>
	);
};

export default Item;
