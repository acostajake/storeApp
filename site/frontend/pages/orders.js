import OrderList from '../components/OrderList';
import SignInWrapper from '../components/SignInWrapper';

const OrderListPage = (props) => (
	<div>
		<SignInWrapper>
			<OrderList id={props.query.id} />
		</SignInWrapper>
	</div>
);

export default OrderListPage;
