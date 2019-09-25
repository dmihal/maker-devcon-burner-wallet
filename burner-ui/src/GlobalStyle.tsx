import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --l1-fs: 24px; 
    --l1-lh: 1.5;
    --l1-weight: 600;

    --l2-fs: 18px;
    --l2-lh: 1.4;
    --l2-weight: 600;

    --l3-fs: 16px;
    --l3-lh: 1.4;
    --l3-weight: 400;

    --l4-fs: 14px;
    --l4-lh: 1.4;
    --l4-weight: 400;

    --l5-fs: 12px;
    --l5-lh: 1.4;
    --l5-weight: 400;

    --main-font: system-ui, "-apple-system", BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    
    --page-margin: 16px;

    --color-primary:  #4E3FCE;
    --color-secondary: #CAC4FF;
    --color-tertiary: #E1DEFF;

    
    --modal-background: #CAC4FF;
    --modal-header-background: #E1DEFF
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--main-font);
  }
`;

export default GlobalStyle;
