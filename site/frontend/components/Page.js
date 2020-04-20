import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from './Header';
import Meta from './Meta';

const theme = {
    lightred: '#FA6C6E',
    red: '#EC000E',
    darkred: '#B10029',
    wine: '#5E0029',
    lightblue: '#C0D2FA',
    lightmidblue: '##709CF3',
    midblue: '#004F98',
    darkblue: '#003A5E',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '800px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: ${theme.darkblue}
    }
`;

const StyledPage = styled.div`
    background: #fff;
    color: ${theme.darkblue};
`;

const Inner = styled.div`
    max-width: ${theme.maxWidth};
    margin: 0 auto;
    padding: 3rem;
`

class Page extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <StyledPage>
                    <Meta />
                    <Header />
                    <Inner>
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        )
    }
}

export default Page;