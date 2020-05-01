import Order from '../components/Order';
import SignInWrapper from '../components/SignInWrapper';

const OrderPage = (props) => (
	<div>
		<SignInWrapper>
			<Order id={props.query.id} />
		</SignInWrapper>
	</div>
);

export default OrderPage;
