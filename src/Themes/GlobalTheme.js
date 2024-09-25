// src/theme.js

export const theme = {
    colors: {
      primary: '#4A90E2',  // Azul
      secondary: '#D5D5D5', // Cinza claro
      accent: '#F5A623',    // Laranja
      background: '#FFFFFF', // Branco
      text: '#333333',      // Preto
      error: '#FF3D00',     // Vermelho
    },
    fonts: {
      main: "'Roboto', sans-serif",
    },
    spacing: (factor) => `${0.25 * factor}rem`, // Define espaçamentos
  };
  