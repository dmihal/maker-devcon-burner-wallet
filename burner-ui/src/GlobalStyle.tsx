import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --l1-fs: 24px; 
    --l1-lh: 1.5;
    --l1-weight: 600;

    --l2-fs: 18px;
    --l2-lh: 1.4;
    --l2-weight: 600;


    --main-font: system-ui, "-apple-system", BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    
    --page-margin: 16px;
    
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--main-font);
  }
`;

export default GlobalStyle;
