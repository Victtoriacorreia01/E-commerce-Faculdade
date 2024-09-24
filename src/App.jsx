import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; 
import GlobalStyles from './Shared/Styles/GlobalStyles'; 
import Header from './Shared/Components/Header'; 
import Footer from './Shared/Components/Footer';
import theme from './Themes/GlobalTheme';

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
