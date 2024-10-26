import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token recuperado no useEffect:', token);
    
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      console.log('Token armazenado:', token);
    }
  };

  const logout = () => {
    console.log("Iniciando logout...");
    localStorage.removeItem('authToken'); 
    setIsAuthenticated(false); 
    console.log("Logout efetuado com sucesso");
    Navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
