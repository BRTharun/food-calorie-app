import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Image:", image);
    console.log("Quantity:", quantity);
  
    const imageUrl = encodeURIComponent(image.name); // Encode the image name to be part of the URL
  
    try {
      const response = await axios.post(`http://localhost:8000/food-predict/?image_path=${imageUrl}&quantity=${quantity}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

// ...


  return (
    <div className="App">
      <h1>Food Calorie Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input type="file" accept="image/*" id="image" onChange={handleImageChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (grams):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>Prediction: {result.Prediction}</p>
          <p>Quantity: {result.Quantity} grams</p>
          <p>Protein (g): {result['Protein (g)']}</p>
          <p>Carbohydrates (g): {result['Carbohydrates (g)']}</p>
          <p>Fat (g): {result['Fat (g)']}</p>
          <p>Total Calories: {result['Total_Calories']}</p>
          <p>Rasa: {result.Rasa}</p>
          <p>Guna: {result.Guna}</p>
          <p>Virya: {result.Virya}</p>
        </div>
      )}
    </div>
  );
}

export default App;
