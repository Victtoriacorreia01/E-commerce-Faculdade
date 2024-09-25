/*import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPermissionPage = () => {
  const navigate = useNavigate();

  // Função para redirecionar para a página inicial
  const handleGoBack = () => {
    navigate('/'); 
  };

  // Função para redirecionar para a página de login
  const handleLoginRedirect = () => {
    navigate('/auth/login'); 
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" color="error" gutterBottom>
        Acesso Negado
      </Typography>
      <Typography variant="h6" gutterBottom>
        Você não tem permissão para acessar esta página.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por favor, faça login com uma conta autorizada ou entre em contato com o administrador.
      </Typography>
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ marginRight: '10px' }}
        >
          Voltar para a página inicial
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLoginRedirect}
        >
          Fazer Login
        </Button>
      </div>
    </Container>
  );
};

export default NoPermissionPage;*/
