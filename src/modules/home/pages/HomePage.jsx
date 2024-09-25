// src/modules/home/pages/HomePage.jsx

import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Bem-vindo à Nossa Página</Title>
      <Description>
        Aqui você pode encontrar uma variedade de produtos e serviços. Navegue e descubra o que temos a oferecer!
      </Description>
      <Button>Começar</Button>
    </Container>
  );
};

export default Home;
