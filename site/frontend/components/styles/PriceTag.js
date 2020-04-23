import styled from 'styled-components';

const PriceTag = styled.span`
	color: ${(props) => props.theme.lightblue};
	font-weight: 600;
	line-height: 1;
	font-size: 3rem;
	display: inline-block;
	position: absolute;
	right: -3px;
`;

export default PriceTag;
