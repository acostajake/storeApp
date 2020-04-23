import styled from 'styled-components';

const Title = styled.h3`
	margin: 0 1rem;
	text-align: center;
	margin-top: -1rem;
	a {
		display: inline;
		line-height: 1.3;
		font-size: 4rem;
		text-align: center;
		color: ${(props) => props.theme.blue};
	}
`;

export default Title;
