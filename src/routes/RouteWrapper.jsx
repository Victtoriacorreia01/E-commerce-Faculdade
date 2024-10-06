import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// Componente RouteWrapper que gerencia a lógica de autenticação
const RouteWrapper = ({ children, isProtected = false }) => {
  const location = useLocation();

  // Verificar autenticação
  const authToken = localStorage.getItem('authToken');

  // Caso a rota seja protegida, verificar se o usuário está autenticado
  if (isProtected && !authToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />; // Redireciona para a página de login
  }

  // Renderiza as rotas permitidas
  return <>{children}</>;
};

export default RouteWrapper;
