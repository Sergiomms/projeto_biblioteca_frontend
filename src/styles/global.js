import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  body {
    width: 100%;
    max-width: 2000px;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
  }

`;

export default Global;