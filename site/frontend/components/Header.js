import Link from 'next/link';
import styled from 'styled-components';

import Cart from './Cart';
import Nav from './Nav';

const Logo = styled.h1`
	font-size: 3rem;
	margin-left: 1rem;
	z-index: 2;
	a {
		padding: 0.5rem 1rem;
		text-transform: uppercase;
	}
	@media (max-width: ${(props) => props.theme.maxWidth}) {
		margin: 1rem 0;
		text-align: center;
	}
`;

const StyledHeader = styled.header`
	.bar {
		border-bottom: 10px solid ${(props) => props.theme.darkblue};
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
		@media (max-width: ${(props) => props.theme.maxWidth}) {
			grid-template-columns: 1fr;
			justify-content: center;
		}
	}
	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid ${(props) => props.theme.lightgrey};
	}
`;

const Header = () => (
	<StyledHeader>
		<div className='bar'>
			<Logo>
				<Link href='/'>
					<a>Store</a>
				</Link>
			</Logo>
			<Nav />
		</div>
		<div className='sub-bar'>
			<p>Search</p>
		</div>
		<div className='bar'>
			<Cart />
		</div>
	</StyledHeader>
);

export default Header;
