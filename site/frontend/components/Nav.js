import Link from 'next/link';
import { Mutation } from 'react-apollo';

import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import User from './User';

import { TOGGLE_CART_MUTATION } from '../lib/queries';

const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<>
				<NavStyles>
					<div>{`Logged in as ${me.name}`}</div>
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
							<Mutation mutation={TOGGLE_CART_MUTATION}>
								{(toggleCart) => <button onClick={toggleCart}>My Cart</button>}
							</Mutation>
						</>
					)}
					{!me && (
						<Link href='/signup'>
							<a>Log in / Sign Up</a>
						</Link>
					)}
				</NavStyles>
			</>
		)}
	</User>
);

export default Nav;
