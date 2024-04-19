<template>
  <!-- Main app container -->
  <div id="app">
    <!-- Display a message -->
    <h1>{{ message }}</h1>
    <!-- Input field to enter city -->
    <input type="text" v-model="city" placeholder="Enter city" />
    <!-- Button to fetch weather data -->
    <button @click="getWeather">Get Weather</button>
    <!-- Display loading message while fetching data -->
    <div v-if="loading">Loading...</div>
    <!-- Display error message if there's an error -->
    <div v-if="error" class="error">{{ error }}</div>
    <!-- Display weather data if available -->
    <div v-if="weatherData" class="weather">
      <!-- Display city name -->
      <h2>Weather in {{ weatherData.name }}</h2>
      <!-- Display temperature -->
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <!-- Display weather description -->
      <p>Description: {{ weatherData.weather[0].description }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  // Data properties
  data() {
    return {
      // City input value
      city: "",
      // Weather data from API
      weatherData: null,
      // Loading state
      loading: false,
      // Error message
      error: null,
    };
  },
  // Methods
  methods: {
    // Method to fetch weather data
    async getWeather() {
      // Set loading state to true
      this.loading = true;
      // Clear previous error message
      this.error = null;

      // Get current geolocation
      navigator.geolocation.getCurrentPosition(async (position) => {
        // Extract latitude and longitude from geolocation
        const { latitude, longitude } = position.coords;
        // API key for OpenWeatherMap API
        const apiKey = "ab5af9c6013f1d6855f465a7d064bde7";
        // API URL to fetch weather data using latitude and longitude
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
          // Log the URL for debugging
          console.log("Fetching data from:", url);
          // Fetch weather data from API
          const response = await axios.get(url);
          // Log the API response for debugging
          console.log("API Response:", response.data);
          // Store the weather data in the component's data
          this.weatherData = response.data;
        } catch (error) {
          // Log and display error message if fetching data fails
          console.error("Error fetching weather data:", error);
          this.error = "An error occurred while fetching weather data.";
        } finally {
          // Set loading state to false after fetching data
          this.loading = false;
        }
      }, (error) => {
        // Log and display error message if geolocation fails
        console.error("Error getting geolocation:", error);
        this.error = "Unable to get your current location.";
        this.loading = false;
      });
    },
  },
};
</script>
