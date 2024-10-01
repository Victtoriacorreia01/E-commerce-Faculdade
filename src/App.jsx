import { CartProvider } from '../src/hooks/use-cart'; // Ajuste o caminho conforme sua estrutura
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/routes/AppRoutes'; 
import GlobalStyles from '../src/Shared/Styles/GlobalStyles'; 
import Header from '../src/Shared/Components/Header'; 
import Footer from '../src/Shared/Components/Footer';
import { ThemeProvider } from 'styled-components';
import { theme } from './Themes/GlobalTheme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CartProvider> {/* Certifique-se de que o CartProvider está sendo usado */}
      <Router>
        <GlobalStyles /> 
        <main>
          <Header />
          <AppRoutes /> 
          <Footer />
        </main>
      </Router>
    </CartProvider>
  </ThemeProvider>
);

export default App;
