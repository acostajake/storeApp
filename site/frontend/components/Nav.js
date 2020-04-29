import Link from 'next/link';
import { adopt } from 'react-adopt';
import { Mutation } from 'react-apollo';

import CartCount from './CartCount';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import User from './User';

import { TOGGLE_CART_MUTATION } from '../lib/queries';

const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => (
		<Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
	),
});

const Nav = () => (
	<Composed>
		{({ user, toggleCart, localState }) => {
			const me = user.data.me;
			return (
				<>
					<NavStyles>
						<div>{`Logged in as ${me && me.name}`}</div>
						<Link href='/store'>
							<a>Store</a>
						</Link>
						{me && (
							<>
								<Link href='/sell'>
									<a>Sell</a>
								</Link>
								<Link href='/signup'>
									<a>Signup</a>
								</Link>
								<Link href='/orders'>
									<a>Orders</a>
								</Link>
								<Signout />
								<button onClick={toggleCart}>
									My Cart
									<CartCount
										count={me.cart.reduce(
											(total, item) => total + item.quantity,
											0
										)}
									/>
								</button>
							</>
						)}
						{!me && (
							<Link href='/signup'>
								<a>Log in / Sign Up</a>
							</Link>
						)}
					</NavStyles>
				</>
			);
		}}
	</Composed>
);

export default Nav;
