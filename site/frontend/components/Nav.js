import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import User from './User';

const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<>
				<NavStyles>
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
							<div>{`Logged in as ${me.name}`}</div>
							<Signout />
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
