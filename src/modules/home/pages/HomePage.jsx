import React from 'react';
import { Container, Grid, Box, Typography} from '@mui/material';
import Section from '../components/Section';

const MainPage: React.FC = () => {
    return (
        <Container>
            <Box sx={{ padding: '40px', textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    Bem-vindo ao Gestão Ao Vivo
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Conectando proprietários e construtoras para obras e reformas de todos os tamanhos.
                </Typography>
                <Grid container spacing={4} sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} sm={6}>
                        <Section 
                            title="Área do Proprietário"
                            description="Como proprietário, você pode gerenciar suas obras e reformas com facilidade. Acesse todas as ferramentas necessárias para monitorar o progresso, fazer ajustes e garantir que seus projetos sejam concluídos com sucesso."
                            buttonText="Acessar como Proprietário"
                            buttonHref="/owner"
                            backgroundColor="#f0f0f0"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Section 
                            title="Área da Construtora"
                            description="Se você é uma construtora, aqui é onde você pode explorar oportunidades de projetos, fazer o gerenciamento das suas obras e colaborar com proprietários para entregar trabalhos de qualidade."
                            buttonText="Acessar como Construtora"
                            buttonHref="/company"
                            backgroundColor="#e0e0e0"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default MainPage;
