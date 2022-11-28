import { createGlobalStyle } from "styled-components";

/* 전역 스타일링 */
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: rgba(0,0,0,0.04);
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
  form {
    text-align: center;
  }
  ul {
    list-style: none;
  }
  input, button {
    display: block;
  }
  input:read-only {
    outline: none;
    border: none;
  }
  a {
    text-decoration: none;
  }
  label {
    display: none;
  }
  
  .first-button {
    margin-right: 25px;
  }
  .last-button {
    margin-left: 25px;
  }
  .todo-main section {
    display: felx;
  }
`;

export default GlobalStyle;
