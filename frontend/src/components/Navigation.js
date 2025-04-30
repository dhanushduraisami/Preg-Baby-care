import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Chatbot from './Chatbot';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pregnancy Care
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/calendar"
          >
            Appointments
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/nutrition"
          >
            Nutrition
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/weight-tracker"
          >
            Weight Tracker
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/exercise"
          >
            Exercise
          </Button>
          <Chatbot />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 