import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightTracker = () => {
  const [weightData, setWeightData] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [week, setWeek] = useState('');

  useEffect(() => {
    // Load saved weight data from localStorage
    const savedData = localStorage.getItem('weightData');
    if (savedData) {
      setWeightData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newWeight && week) {
      const newEntry = {
        week: parseInt(week),
        weight: parseFloat(newWeight),
        date: new Date().toISOString().split('T')[0]
      };
      
      const updatedData = [...weightData, newEntry].sort((a, b) => a.week - b.week);
      setWeightData(updatedData);
      localStorage.setItem('weightData', JSON.stringify(updatedData));
      setNewWeight('');
      setWeek('');
    }
  };

  const calculateProgress = () => {
    if (weightData.length < 2) return 0;
    const firstWeight = weightData[0].weight;
    const lastWeight = weightData[weightData.length - 1].weight;
    const totalWeeks = weightData[weightData.length - 1].week - weightData[0].week;
    return ((lastWeight - firstWeight) / totalWeeks).toFixed(1);
  };

  const chartData = {
    labels: weightData.map(entry => `Week ${entry.week}`),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightData.map(entry => entry.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Progression'
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Weekly Weight Tracker
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Log New Weight
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pregnancy Week"
                    type="number"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Log Weight
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weight Progress
              </Typography>
              <Typography variant="body1" gutterBottom>
                Average weekly change: {calculateProgress()} kg
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(Math.abs(calculateProgress() * 100), 100)} 
                color={calculateProgress() > 0 ? 'success' : 'error'}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Weight History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Week</TableCell>
                    <TableCell>Weight (kg)</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weightData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>Week {entry.week}</TableCell>
                      <TableCell>{entry.weight}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Line data={chartData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WeightTracker; 