const express = require('express');
const app = express();
const PORT = 3000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFoodList = async () => {
  await delay(115);
  return [
    { name: 'Pasta', description: 'Italian pasta with tomato sauce', price: 10 },
    { name: 'Sushi', description: 'Japanese rice dish with seafood', price: 15 },
  ];
};

const fetchAvailableLocations = async () => {
  await delay(2 * 60 * 1000);
  return ['Goa', 'Mumbai', 'Delhi'];
};

const fetchNutritionalInfo = async () => {
  await delay(300);
  return [
    { name: 'Pasta', calories: 200, protein: 7 },
    { name: 'Sushi', calories: 150, protein: 10 },
  ];
};

const fetchStockOutFoods = async () => {
  await delay(100);
  return ['Burger', 'Pizza'];
};

app.get('/food-data', async (req, res) => {
  try {
    const [foodList, locations, nutritionInfo, stockOutFoods] = await Promise.all([
      fetchFoodList(),
      fetchAvailableLocations(),
      fetchNutritionalInfo(),
      fetchStockOutFoods(),
    ]);

    const responseData = {
      foodList,
      locations,
      nutritionInfo,
      stockOutFoods,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});