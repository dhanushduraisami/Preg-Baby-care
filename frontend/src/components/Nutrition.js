import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  Paper,
  TextField,
  Button
} from '@mui/material';

const Nutrition = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    trimester: '',
    age: '',
    activityLevel: 'moderate'
  });

  const [bmi, setBmi] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      const bmiValue = formData.weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
      setShowResults(true);
    }
  };

  const getNutritionAdvice = () => {
    let advice = [];
    let calorieNeeds = 0;

    // Calculate base calorie needs based on BMI and trimester
    if (bmi < 18.5) {
      calorieNeeds = 2200 + (formData.trimester * 300);
      advice.push("Focus on nutrient-dense foods to support healthy weight gain");
    } else if (bmi >= 18.5 && bmi < 25) {
      calorieNeeds = 2000 + (formData.trimester * 300);
      advice.push("Maintain balanced diet with gradual calorie increase");
    } else {
      calorieNeeds = 1800 + (formData.trimester * 200);
      advice.push("Focus on nutrient quality while managing calorie intake");
    }

    // Add trimester-specific advice
    if (formData.trimester === "1") {
      advice.push("Focus on folic acid-rich foods to support early development");
      advice.push("Small, frequent meals to manage nausea");
    } else if (formData.trimester === "2") {
      advice.push("Increase protein intake for baby's growth");
      advice.push("Include calcium-rich foods for bone development");
    } else if (formData.trimester === "3") {
      advice.push("Focus on iron-rich foods to prevent anemia");
      advice.push("Include fiber-rich foods to prevent constipation");
    }

    return { calorieNeeds, advice };
  };

  const { calorieNeeds, advice } = getNutritionAdvice();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Pregnancy Nutrition Guide
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Personal Nutrition Assessment
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Trimester"
              name="trimester"
              value={formData.trimester}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Trimester</option>
              <option value="1">First Trimester</option>
              <option value="2">Second Trimester</option>
              <option value="3">Third Trimester</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={calculateBMI}
              sx={{ mt: 2 }}
            >
              Calculate Nutrition Needs
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {showResults && (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Personalized Nutrition Plan
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Your Health Metrics
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="BMI" 
                        secondary={bmi}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Daily Calorie Needs" 
                        secondary={`${calorieNeeds} calories`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recommended Foods
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Protein Sources" 
                        secondary="Lean meats, fish, eggs, beans, lentils"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Calcium Sources" 
                        secondary="Dairy products, fortified plant milks, leafy greens"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Iron Sources" 
                        secondary="Red meat, spinach, fortified cereals, beans"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personalized Recommendations
                  </Typography>
                  <List>
                    {advice.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            General Tips
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Stay Hydrated" 
                secondary="Aim for 8-10 glasses of water daily"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Eat Regular Meals" 
                secondary="Small, frequent meals help maintain energy levels"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Limit Caffeine" 
                secondary="Keep caffeine intake below 200mg per day"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Avoid Certain Foods" 
                secondary="Raw fish, unpasteurized dairy, and undercooked meats"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Nutrition; 