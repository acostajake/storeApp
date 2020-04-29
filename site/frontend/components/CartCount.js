import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import CartItem from './CartItem';

const AnimatedStyles = styled.span`
	position: relative;
	.count {
		display: block;
		position: relative;
		transition: all 0.6s;
		backface-visibility: hidden;
	}
	.count-enter {
		transform: rotateX(0.5turn);
	}
	.count-enter-active {
		transform: rotateX(0);
	}
	.count-exit {
		top: 0;
		position: absolute;
		transform: rotateX(0);
	}
	.count-exit-active {
		transform: rotateX(0.5turn);
	}
`;

const Dot = styled.div`
	background: ${(props) => props.theme.darkblue};
	color: white;
	border-radius: 50%;
	padding: 0.5rem;
	margin-left: 0.5rem;
	height: 3rem;
	min-width: 3rem;
	font-weight: 100;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => (
	<AnimatedStyles>
		<TransitionGroup>
			<CSSTransition
				unmountOnExit
				className='count'
				classNames='count'
				key={count}
				timeout={{ enter: 600, exit: 600 }}
			>
				<Dot>{count}</Dot>
			</CSSTransition>
		</TransitionGroup>
	</AnimatedStyles>
);

CartCount.propTypes = {
	count: PropTypes.number.isRequired,
};

export default CartCount;
