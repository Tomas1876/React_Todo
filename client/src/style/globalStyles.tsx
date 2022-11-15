import { createGlobalStyle } from "styled-components";

/* 전역 스타일링 */
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
  form {
    text-align: center;
  }
  input, button {
    display: block;
  }
  a {
    text-decoration: none;
  }
  .first-button {
    margin-right: 25px;
  }
  .last-button {
    margin-left: 25px;
  }
`;

export default GlobalStyle;