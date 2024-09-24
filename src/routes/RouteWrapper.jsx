import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import NoPermissionPage from '../Shared/Pages/NoPermissionPage'; // Página de "Sem Permissão"

interface RouteWrapperProps {
  children: ReactNode;
  isProtected?: boolean; // Define se a rota requer autenticação
  requiresPermission?: boolean; // Define se a rota requer permissão
}

const RouteWrapper = ({ children, isProtected = false, requiresPermission = false }: RouteWrapperProps) => {
  const location = useLocation();

  // Verificar autenticação e permissões
  const authToken = localStorage.getItem('authToken');
  const permission = localStorage.getItem('permission');

  // Caso a rota seja protegida, verificar se o usuário está autenticado
  if (isProtected && !authToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />; // Redireciona para a página de login
  }

  // Caso a rota exija permissão e o usuário não a tenha
  if (requiresPermission && permission !== '1') {
    return <NoPermissionPage />; // Redireciona para uma página de "Sem Permissão"
  }

  // Renderizar as rotas permitidas
  return <>{children}</>;
};

export default RouteWrapper;
