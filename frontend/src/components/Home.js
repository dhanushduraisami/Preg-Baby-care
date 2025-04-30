import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/pregnancy-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Welcome to Pregnancy Care
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            align="center" 
            sx={{ 
              color: 'text.secondary',
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Your trusted companion for a healthy pregnancy journey
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <Typography variant="h5" gutterBottom color="primary">
                  About Our Services
                </Typography>
                <Typography paragraph>
                  We provide comprehensive pregnancy care services to ensure a healthy journey for both mother and baby.
                  Our services include regular check-ups, nutritional guidance, and expert medical care.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <Typography variant="h5" gutterBottom color="primary">
                  Schedule Your Appointments
                </Typography>
                <Typography paragraph>
                  Easily manage your doctor appointments through our calendar system.
                  Book, reschedule, or cancel appointments at your convenience.
                </Typography>
                <Link to="/calendar" style={{ textDecoration: 'none' }}>
                  <Typography 
                    color="primary" 
                    sx={{ 
                      mt: 2,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Go to Appointment Calendar →
                  </Typography>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 