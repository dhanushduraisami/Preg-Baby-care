import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Divider,
  Alert
} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PoolIcon from '@mui/icons-material/Pool';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ExerciseRoutines = () => {
  const [trimester, setTrimester] = useState(0);

  const handleChange = (event, newValue) => {
    setTrimester(newValue);
  };

  const exerciseData = {
    0: {
      title: "First Trimester (Weeks 1-12)",
      description: "Focus on maintaining your regular exercise routine with some modifications. Listen to your body and stay hydrated.",
      exercises: [
        {
          name: "Walking",
          description: "30 minutes daily at a comfortable pace",
          icon: <DirectionsRunIcon />
        },
        {
          name: "Swimming",
          description: "Low-impact cardio, 2-3 times per week",
          icon: <PoolIcon />
        },
        {
          name: "Prenatal Yoga",
          description: "Gentle stretching and breathing exercises",
          icon: <SelfImprovementIcon />
        },
        {
          name: "Light Strength Training",
          description: "Focus on maintaining muscle tone with light weights",
          icon: <FitnessCenterIcon />
        }
      ],
      precautions: [
        "Avoid exercises that involve lying flat on your back",
        "Stay hydrated and take frequent breaks",
        "Avoid overheating and high-intensity workouts",
        "Listen to your body and modify as needed"
      ]
    },
    1: {
      title: "Second Trimester (Weeks 13-27)",
      description: "As your belly grows, focus on exercises that support your changing body and maintain strength.",
      exercises: [
        {
          name: "Prenatal Pilates",
          description: "Core strengthening and posture improvement",
          icon: <SelfImprovementIcon />
        },
        {
          name: "Water Aerobics",
          description: "Low-impact full-body workout",
          icon: <PoolIcon />
        },
        {
          name: "Modified Strength Training",
          description: "Focus on upper body and legs",
          icon: <FitnessCenterIcon />
        },
        {
          name: "Gentle Cardio",
          description: "Walking or stationary cycling",
          icon: <DirectionsRunIcon />
        }
      ],
      precautions: [
        "Avoid exercises that require balance",
        "Modify exercises to accommodate growing belly",
        "Focus on posture and core strength",
        "Stay hydrated and cool"
      ]
    },
    2: {
      title: "Third Trimester (Weeks 28-40)",
      description: "Focus on gentle movements and preparation for labor. Prioritize comfort and safety.",
      exercises: [
        {
          name: "Pelvic Floor Exercises",
          description: "Kegels and gentle pelvic tilts",
          icon: <SelfImprovementIcon />
        },
        {
          name: "Gentle Yoga",
          description: "Focus on breathing and relaxation",
          icon: <SelfImprovementIcon />
        },
        {
          name: "Walking",
          description: "Shorter, more frequent walks",
          icon: <DirectionsRunIcon />
        },
        {
          name: "Stretching",
          description: "Gentle stretching for comfort",
          icon: <FitnessCenterIcon />
        }
      ],
      precautions: [
        "Avoid exercises that cause discomfort",
        "Focus on breathing and relaxation",
        "Stay hydrated and take frequent breaks",
        "Listen to your body and stop if needed"
      ]
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Safe Exercise Routines
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Always consult with your healthcare provider before starting any exercise routine during pregnancy.
      </Alert>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Tabs
          value={trimester}
          onChange={handleChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="First Trimester" />
          <Tab label="Second Trimester" />
          <Tab label="Third Trimester" />
        </Tabs>

        <Typography variant="h5" gutterBottom color="primary">
          {exerciseData[trimester].title}
        </Typography>
        <Typography variant="body1" paragraph>
          {exerciseData[trimester].description}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recommended Exercises
                </Typography>
                <List>
                  {exerciseData[trimester].exercises.map((exercise, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {exercise.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={exercise.name}
                        secondary={exercise.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Safety Precautions
                </Typography>
                <List>
                  {exerciseData[trimester].precautions.map((precaution, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={precaution} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          General Exercise Guidelines
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Stay Hydrated"
              secondary="Drink water before, during, and after exercise"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Warm Up and Cool Down"
              secondary="Always include proper warm-up and cool-down periods"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Listen to Your Body"
              secondary="Stop immediately if you feel dizzy, short of breath, or experience any pain"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Avoid High-Risk Activities"
              secondary="Stay away from contact sports, activities with risk of falling, or exercises that require lying flat on your back"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default ExerciseRoutines; 