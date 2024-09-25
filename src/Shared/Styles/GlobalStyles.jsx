// src/Shared/Styles/GlobalStyles.jsx

import { createGlobalStyle } from 'styled-components'; // Importe a função aqui

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif; // Altere para a fonte que você deseja usar
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit; // Mantém a cor padrão do texto
    transition: color 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent}; // Muda a cor ao passar o mouse
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1em 0;
    color: ${({ theme }) => theme.colors.primary}; // Define a cor dos títulos
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
