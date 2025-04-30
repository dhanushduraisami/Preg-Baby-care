import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './components/Home';
import PregnancyCalendar from './components/PregnancyCalendar';
import Nutrition from './components/Nutrition';
import WeightTracker from './components/WeightTracker';
import ExerciseRoutines from './components/ExerciseRoutines';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navigation />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<PregnancyCalendar />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/weight-tracker" element={<WeightTracker />} />
          <Route path="/exercise" element={<ExerciseRoutines />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
