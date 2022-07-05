import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    display:flex; 
    flex-direction:column; 
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: #34313c;
    font-weight: 500;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  button {
    border: 0;
  }
`;

export default GlobalStyle;
