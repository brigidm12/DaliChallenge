import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vibeLabel, setVibeLabel] = useState('');
  const [playlistData, setPlaylistData] = useState(null);

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
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      vibe = 'Morning';
    } else if (hour >= 12 && hour < 18) {
      vibe = 'Daytime';
    } else {
      vibe = 'Nighttime';
    }
  

    // Temperature-based vibes
    if (temp < 32) {
      vibe += ', Cold';
    } else if (temp >= 32 && temp < 60) {
      vibe += ', Cool';
    } else if (temp >= 60 && temp < 80) {
      vibe += ', Pleasant';
    } else {
      vibe += ', Warm';
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




  useEffect(() => {
    if (vibeLabel) {
      fetchPlaylistData();
    }
  }, [vibeLabel]);
//!!!!!!!!!!!!!!!!!!
  


// Add mappings for daytime vibes
const weatherToVibe = {
    // Morning vibes
    'Morning, Cold, Dry, Calm': 'Morning Coziness',
    'Morning, Cold, Dry, Breezy': 'Morning Coziness',
    'Morning, Cold, Dry, Windy': 'Morning Coziness',
    'Morning, Cold, Humid, Calm': 'Frosty Morning',
    'Morning, Cold, Humid, Breezy': 'Frosty Morning',
    'Morning, Cold, Humid, Windy': 'Frosty Morning',
    'Morning, Cool, Dry, Calm': 'Refreshing Start',
    'Morning, Cool, Dry, Breezy': 'Refreshing Start',
    'Morning, Cool, Dry, Windy': 'Refreshing Start',
    'Morning, Cool, Humid, Calm': 'Misty Morning',
    'Morning, Cool, Humid, Breezy': 'Misty Morning',
    'Morning, Cool, Humid, Windy': 'Misty Morning',
    'Morning, Pleasant, Dry, Calm': 'Sunny Morning',
    'Morning, Pleasant, Dry, Breezy': 'Sunny Morning',
    'Morning, Pleasant, Dry, Windy': 'Sunny Morning',
    'Morning, Pleasant, Humid, Calm': 'Breezy Sunrise',
    'Morning, Pleasant, Humid, Breezy': 'Breezy Sunrise',
    'Morning, Pleasant, Humid, Windy': 'Breezy Sunrise',
    'Morning, Warm, Dry, Calm': 'Energetic Morning',
    'Morning, Warm, Dry, Breezy': 'Energetic Morning',
    'Morning, Warm, Dry, Windy': 'Energetic Morning',
    'Morning, Warm, Humid, Calm': 'Sunrise Serenity',
    'Morning, Warm, Humid, Breezy': 'Sunrise Serenity',
    'Morning, Warm, Humid, Windy': 'Sunrise Serenity',
    'Morning, Hot, Dry, Calm': 'Tropical Morning',
    'Morning, Hot, Dry, Breezy': 'Tropical Morning',
    'Morning, Hot, Dry, Windy': 'Tropical Morning',
    'Morning, Hot, Humid, Calm': 'Summer Sunrise',
    'Morning, Hot, Humid, Breezy': 'Summer Sunrise',
    'Morning, Hot, Humid, Windy': 'Summer Sunrise',
  
    // Daytime vibes
    'Daytime, Cold, Dry, Calm': 'Crisp Day',
    'Daytime, Cold, Dry, Breezy': 'Crisp Day',
    'Daytime, Cold, Dry, Windy': 'Crisp Day',
    'Daytime, Cold, Humid, Calm': 'Frigid Daylight',
    'Daytime, Cold, Humid, Breezy': 'Frigid Daylight',
    'Daytime, Cold, Humid, Windy': 'Frigid Daylight',
    'Daytime, Cool, Dry, Calm': 'Mild Afternoon',
    'Daytime, Cool, Dry, Breezy': 'Mild Afternoon',
    'Daytime, Cool, Dry, Windy': 'Mild Afternoon',
    'Daytime, Cool, Humid, Calm': 'Breezy Daylight',
    'Daytime, Cool, Humid, Breezy': 'Breezy Daylight',
    'Daytime, Cool, Humid, Windy': 'Breezy Daylight',
    'Daytime, Pleasant, Dry, Calm': 'Sunny Afternoon',
    'Daytime, Pleasant, Dry, Breezy': 'Sunny Afternoon',
    'Daytime, Pleasant, Dry, Windy': 'Sunny Afternoon',
    'Daytime, Pleasant, Humid, Calm': 'Warm Daylight',
    'Daytime, Pleasant, Humid, Breezy': 'Warm Daylight',
    'Daytime, Pleasant, Humid, Windy': 'Warm Daylight',
    'Daytime, Warm, Dry, Calm': 'Balmy Day',
    'Daytime, Warm, Dry, Breezy': 'Balmy Day',
    'Daytime, Warm, Dry, Windy': 'Balmy Day',
    'Daytime, Warm, Humid, Calm': 'Summer Daylight',
    'Daytime, Warm, Humid, Breezy': 'Summer Daylight',
    'Daytime, Warm, Humid, Windy': 'Summer Daylight',
    'Daytime, Hot, Dry, Calm': 'Scorching Afternoon',
    'Daytime, Hot, Dry, Breezy': 'Scorching Afternoon',
    'Daytime, Hot, Dry, Windy': 'Scorching Afternoon',
    'Daytime, Hot, Humid, Calm': 'Tropical Daylight',
    'Daytime, Hot, Humid, Breezy': 'Tropical Daylight',
    'Daytime, Hot, Humid, Windy': 'Tropical Daylight',
  
    // Nighttime vibes
    'Nighttime, Cold, Dry, Calm': 'Chilly Night',
    'Nighttime, Cold, Dry, Breezy': 'Chilly Night',
    'Nighttime, Cold, Dry, Windy': 'Chilly Night',
    'Nighttime, Cold, Humid, Calm': 'Frosty Night',
    'Nighttime, Cold, Humid, Breezy': 'Frosty Night',
    'Nighttime, Cold, Humid, Windy': 'Frosty Night',
    'Nighttime, Cool, Dry, Calm': 'Crisp Night',
    'Nighttime, Cool, Dry, Breezy': 'Crisp Night',
    'Nighttime, Cool, Dry, Windy': 'Crisp Night',
    'Nighttime, Cool, Humid, Calm': 'Chill Night',
    'Nighttime, Cool, Humid, Breezy': 'Chill Night',
    'Nighttime, Cool, Humid, Windy': 'Chill Night',
    'Nighttime, Pleasant, Dry, Calm': 'Mild Night',
    'Nighttime, Pleasant, Dry, Breezy': 'Mild Night',
    'Nighttime, Pleasant, Dry, Windy': 'Mild Night',
    'Nighttime, Pleasant, Humid, Calm': 'Balmy Night',
    'Nighttime, Pleasant, Humid, Breezy': 'Balmy Night',
    'Nighttime, Pleasant, Humid, Windy': 'Balmy Night',
    'Nighttime, Warm, Dry, Calm': 'Warm Night',
    'Nighttime, Warm, Dry, Breezy': 'Warm Night',
    'Nighttime, Warm, Dry, Windy': 'Warm Night',
    'Nighttime, Warm, Humid, Calm': 'Tropical Night',
    'Nighttime, Warm, Humid, Breezy': 'Tropical Night',
    'Nighttime, Warm, Humid, Windy': 'Tropical Night',
    'Nighttime, Hot, Dry, Calm': 'Sultry Night',
    'Nighttime, Hot, Dry, Breezy': 'Sultry Night',
    'Nighttime, Hot, Dry, Windy': 'Sultry Night',
    'Nighttime, Hot, Humid, Calm': 'Sweltering Night',
    'Nighttime, Hot, Humid, Breezy': 'Sweltering Night',
    'Nighttime, Hot, Humid, Windy': 'Sweltering Night',
  };






  const fetchPlaylistData = () => {
    const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk'; // Replace with your Spotify access token

// Map vibes to Spotify playlist IDs
const vibeToPlaylistID = {
  // Chill vibes
  'Morning Coziness': '1lfieyG6FbXoFvaa8kusIe',
  'Frosty Morning': '1lfieyG6FbXoFvaa8kusIe',
  'Refreshing Start': '37i9dQZF1DX0kbJZpiYdZl',
  'Misty Morning': '37i9dQZF1DX0kbJZpiYdZl',
  'Sunny Morning': '37i9dQZF1DX0kbJZpiYdZl',
  'Breezy Sunrise': '1lfieyG6FbXoFvaa8kusIe',
  'Energetic Morning': '37i9dQZF1DX0kbJZpiYdZl',
  'Sunrise Serenity': '37i9dQZF1DX0kbJZpiYdZl',
  'Tropical Morning': '37i9dQZF1DX0kbJZpiYdZl',
  'Summer Sunrise': '37i9dQZF1DX0kbJZpiYdZl',
  // Add more morning vibes as needed
//37i9dQZF1DX0kbJZpiYdZl
  // Daytime vibes
  'Crisp Day': '37i9dQZF1DX0kbJZpiYdZl',
  'Mild Afternoon': '37i9dQZF1DX0kbJZpiYdZl',
  'Sunny Afternoon': '37i9dQZF1DX0kbJZpiYdZl',
  'Balmy Day': '37i9dQZF1DX0kbJZpiYdZl',
  'Scorching Afternoon': '37i9dQZF1DX0kbJZpiYdZl',
  // Add more daytime vibes as needed

  // Nighttime vibes
  'Chilly Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Frosty Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Crisp Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Chill Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Mild Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Balmy Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Warm Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Tropical Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Sultry Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Sweltering Night': '37i9dQZF1DX0kbJZpiYdZl',
  'Sweltering Morning': '37i9dQZF1DX0kbJZpiYdZl',
  //https://open.spotify.com/playlist/37i9dQZF1DX0kbJZpiYdZl?si=f3fc401dea6340fa
  // Add more morning vibes as needed

  // Add more mappings for evening vibes

  // Add more mappings for daytime vibes

  // Add more mappings for nighttime vibes
};

    

    const playlistID = vibeToPlaylistID[vibeLabel];

    fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
      headers: {
         //'Bearer 7c7d4aa8eb8d4e9889e96199c2b63b7e'

         'Authorization': 'Bearer ' + accessToken
      }
    })
      .then(response => response.json())
      .then(data => {
        setPlaylistData(data);
      })
      .catch(error => console.log('Error fetching playlist data:', error));

  };

  useEffect(() => {
    if (vibeLabel) {
      fetchPlaylistData();
    }
  }, [vibeLabel]);

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
          <p>Playlist: {playlistData && playlistData.name}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
