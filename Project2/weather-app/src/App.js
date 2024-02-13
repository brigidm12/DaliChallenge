import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vibeLabel, setVibeLabel] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch user's location
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // Fetch weather data using OpenWeatherMap API
        const apiKey = '5292c5a4f1ca85ff6dc8f5e859503689';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    if (weatherData) {
      const vibe = getVibeLabel(weatherData);
      setVibeLabel(vibe);
    }
  }, [weatherData]);

  const getVibeLabel = (weatherData) => {
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description.toLowerCase();

    let vibe = 'Neutral';

    // Temperature-based vibes
    if (temp < 32) {
      vibe = 'Cold';
    } else if (temp >= 32 && temp < 60) {
      vibe = 'Cool';
    } else if (temp >= 60 && temp < 80) {
      vibe = 'Pleasant';
    } else {
      vibe = 'Warm';
    }

    // Humidity-based vibes
    if (humidity < 30) {
      vibe += ', Dry';
    } else if (humidity >= 30 && humidity < 70) {
      vibe += ', Humid';
    } else {
      vibe += ', Muggy';
    }

    // Wind-based vibes
    if (windSpeed < 5) {
      vibe += ', Calm';
    } else if (windSpeed >= 5 && windSpeed < 15) {
      vibe += ', Breezy';
    } else {
      vibe += ', Windy';
    }

    // Description-based vibes
    if (description.includes('rain')) {
      vibe += ', Rainy';
    } else if (description.includes('snow')) {
      vibe += ', Snowy';
    } else if (description.includes('clear')) {
      vibe += ', Clear';
    } else if (description.includes('cloud')) {
      vibe += ', Cloudy';
    }

    return vibe;
  };



  

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}&deg;F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} mph</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Vibe Label: {vibeLabel}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
