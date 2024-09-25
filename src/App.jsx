
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; 
import GlobalStyles from './Shared/Styles/GlobalStyles'; 
import Header from './Shared/Components/Header'; 
import Footer from './Shared/Components/Footer';
import { ThemeProvider } from 'styled-components'; // Importe o ThemeProvider aqui
import { theme } from './Themes/GlobalTheme'; // Verifique se a exportação do tema está correta

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyles /> 
      <main>
        <Header />
        <AppRoutes /> 
        <Footer />
      </main>
    </Router>
  </ThemeProvider>
);

export default App;
