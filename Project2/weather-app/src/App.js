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
  
    let timeOfDay = '';
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      timeOfDay = 'Morning';
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'Daytime';
    } else {
      timeOfDay = 'Nighttime';
    }
  
    let vibe = timeOfDay + ' - Neutral';

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


// Add mappings for daytime vibes
const weatherToVibe = {
  // Morning vibes
  // Cold mornings
  'Morning, Cold, Dry, Calm': 'Morning Coziness',
  'Morning, Cold, Dry, Breezy': 'Morning Coziness',
  'Morning, Cold, Dry, Windy': 'Morning Coziness',
  'Morning, Cold, Humid, Calm': 'Frosty Morning',
  'Morning, Cold, Humid, Breezy': 'Frosty Morning',
  'Morning, Cold, Humid, Windy': 'Frosty Morning',
  // Cool mornings
  'Morning, Cool, Dry, Calm': 'Refreshing Start',
  'Morning, Cool, Dry, Breezy': 'Refreshing Start',
  'Morning, Cool, Dry, Windy': 'Refreshing Start',
  'Morning, Cool, Humid, Calm': 'Misty Morning',
  'Morning, Cool, Humid, Breezy': 'Misty Morning',
  'Morning, Cool, Humid, Windy': 'Misty Morning',
  // Pleasant mornings
  'Morning, Pleasant, Dry, Calm': 'Sunny Morning',
  'Morning, Pleasant, Dry, Breezy': 'Sunny Morning',
  'Morning, Pleasant, Dry, Windy': 'Sunny Morning',
  'Morning, Pleasant, Humid, Calm': 'Breezy Sunrise',
  'Morning, Pleasant, Humid, Breezy': 'Breezy Sunrise',
  'Morning, Pleasant, Humid, Windy': 'Breezy Sunrise',
  // Warm mornings
  'Morning, Warm, Dry, Calm': 'Energetic Morning',
  'Morning, Warm, Dry, Breezy': 'Energetic Morning',
  'Morning, Warm, Dry, Windy': 'Energetic Morning',
  'Morning, Warm, Humid, Calm': 'Sunrise Serenity',
  'Morning, Warm, Humid, Breezy': 'Sunrise Serenity',
  'Morning, Warm, Humid, Windy': 'Sunrise Serenity',
  // Hot mornings
  'Morning, Hot, Dry, Calm': 'Tropical Morning',
  'Morning, Hot, Dry, Breezy': 'Tropical Morning',
  'Morning, Hot, Dry, Windy': 'Tropical Morning',
  'Morning, Hot, Humid, Calm': 'Summer Sunrise',
  'Morning, Hot, Humid, Breezy': 'Summer Sunrise',
  'Morning, Hot, Humid, Windy': 'Summer Sunrise',
  
  
  // DAYTIME
  // Cold daytime
  'Daytime, Cold, Dry, Calm': 'Crisp Day',
  'Daytime, Cold, Dry, Breezy': 'Crisp Day',
  'Daytime, Cold, Dry, Windy': 'Crisp Day',
  'Daytime, Cold, Humid, Calm': 'Frigid Daylight',
  'Daytime, Cold, Humid, Breezy': 'Frigid Daylight',
  'Daytime, Cold, Humid, Windy': 'Frigid Daylight',
  // Cool daytime
  'Daytime, Cool, Dry, Calm': 'Mild Afternoon',
  'Daytime, Cool, Dry, Breezy': 'Mild Afternoon',
  'Daytime, Cool, Dry, Windy': 'Mild Afternoon',
  'Daytime, Cool, Humid, Calm': 'Breezy Daylight',
  'Daytime, Cool, Humid, Breezy': 'Breezy Daylight',
  'Daytime, Cool, Humid, Windy': 'Breezy Daylight',
  // Pleasant daytime
  'Daytime, Pleasant, Dry, Calm': 'Sunny Afternoon',
  'Daytime, Pleasant, Dry, Breezy': 'Sunny Afternoon',
  'Daytime, Pleasant, Dry, Windy': 'Sunny Afternoon',
  'Daytime, Pleasant, Humid, Calm': 'Warm Daylight',
  'Daytime, Pleasant, Humid, Breezy': 'Warm Daylight',
  'Daytime, Pleasant, Humid, Windy': 'Warm Daylight',
  // Warm daytime
  'Daytime, Warm, Dry, Calm': 'Balmy Day',
  'Daytime, Warm, Dry, Breezy': 'Balmy Day',
  'Daytime, Warm, Dry, Windy': 'Balmy Day',
  'Daytime, Warm, Humid, Calm': 'Summer Daylight',
  'Daytime, Warm, Humid, Breezy': 'Summer Daylight',
  'Daytime, Warm, Humid, Windy': 'Summer Daylight',
  // Hot daytime
  'Daytime, Hot, Dry, Calm': 'Scorching Afternoon',
  'Daytime, Hot, Dry, Breezy': 'Scorching Afternoon',
  'Daytime, Hot, Dry, Windy': 'Scorching Afternoon',
  'Daytime, Hot, Humid, Calm': 'Tropical Daylight',
  'Daytime, Hot, Humid, Breezy': 'Tropical Daylight',
  'Daytime, Hot, Humid, Windy': 'Tropical Daylight',

    // Nighttime vibes
  // Cold nighttime
  'Nighttime, Cold, Dry, Calm': 'Chilly Night',
  'Nighttime, Cold, Dry, Breezy': 'Chilly Night',
  'Nighttime, Cold, Dry, Windy': 'Chilly Night',
  'Nighttime, Cold, Humid, Calm': 'Frosty Night',
  'Nighttime, Cold, Humid, Breezy': 'Frosty Night',
  'Nighttime, Cold, Humid, Windy': 'Frosty Night',
  
  // Cool nighttime
  'Nighttime, Cool, Dry, Calm': 'Crisp Night',
  'Nighttime, Cool, Dry, Breezy': 'Crisp Night',
  'Nighttime, Cool, Dry, Windy': 'Crisp Night',
  'Nighttime, Cool, Humid, Calm': 'Chill Night',
  'Nighttime, Cool, Humid, Breezy': 'Chill Night',
  'Nighttime, Cool, Humid, Windy': 'Chill Night',
  // Pleasant nighttime
  'Nighttime, Pleasant, Dry, Calm': 'Mild Night',
  'Nighttime, Pleasant, Dry, Breezy': 'Mild Night',
  'Nighttime, Pleasant, Dry, Windy': 'Mild Night',
  'Nighttime, Pleasant, Humid, Calm': 'Balmy Night',
  'Nighttime, Pleasant, Humid, Breezy': 'Balmy Night',
  'Nighttime, Pleasant, Humid, Windy': 'Balmy Night',
  // Warm nighttime
  'Nighttime, Warm, Dry, Calm': 'Warm Night',
  'Nighttime, Warm, Dry, Breezy': 'Warm Night',
  'Nighttime, Warm, Dry, Windy': 'Warm Night',
  'Nighttime, Warm, Humid, Calm': 'Tropical Night',
  'Nighttime, Warm, Humid, Breezy': 'Tropical Night',
  'Nighttime, Warm, Humid, Windy': 'Tropical Night',
  // Hot nighttime
  'Nighttime, Hot, Dry, Calm': 'Sultry Night',
  'Nighttime, Hot, Dry, Breezy': 'Sultry Night',
  'Nighttime, Hot, Dry, Windy': 'Sultry Night',
  'Nighttime, Hot, Humid, Calm': 'Sweltering Night',
  'Nighttime, Hot, Humid, Breezy': 'Sweltering Night',
  'Nighttime, Hot, Humid, Windy': 'Sweltering Night',
};





  const fetchPlaylistData = () => {
// Map vibes to Spotify playlist IDs
const vibeToPlaylistID = {
  // Chill vibes
  'Morning Coziness': 'SPOTIFY_PLAYLIST_ID_FOR_MORNING_COZINESS',
  'Frosty Morning': 'SPOTIFY_PLAYLIST_ID_FOR_FROSTY_MORNING',
  'Refreshing Start': 'SPOTIFY_PLAYLIST_ID_FOR_REFRESHING_START',
  'Misty Morning': 'SPOTIFY_PLAYLIST_ID_FOR_MISTY_MORNING',
  'Sunny Morning': 'SPOTIFY_PLAYLIST_ID_FOR_SUNNY_MORNING',
  'Breezy Sunrise': 'SPOTIFY_PLAYLIST_ID_FOR_BREEZY_SUNRISE',
  'Energetic Morning': 'SPOTIFY_PLAYLIST_ID_FOR_ENERGETIC_MORNING',
  'Sunrise Serenity': 'SPOTIFY_PLAYLIST_ID_FOR_SUNRISE_SERENITY',
  'Tropical Morning': 'SPOTIFY_PLAYLIST_ID_FOR_TROPICAL_MORNING',
  'Summer Sunrise': 'SPOTIFY_PLAYLIST_ID_FOR_SUMMER_SUNRISE',
  // Add more morning vibes as needed

  // Daytime vibes
  'Crisp Day': 'SPOTIFY_PLAYLIST_ID_FOR_CRISP_DAY',
  'Mild Afternoon': 'SPOTIFY_PLAYLIST_ID_FOR_MILD_AFTERNOON',
  'Sunny Afternoon': 'SPOTIFY_PLAYLIST_ID_FOR_SUNNY_AFTERNOON',
  'Balmy Day': 'SPOTIFY_PLAYLIST_ID_FOR_BALMY_DAY',
  'Scorching Afternoon': 'SPOTIFY_PLAYLIST_ID_FOR_SCORCHING_AFTERNOON',
  // Add more daytime vibes as needed

  // Nighttime vibes
  'Chilly Night': 'SPOTIFY_PLAYLIST_ID_FOR_CHILLY_NIGHT',
  'Frosty Night': 'SPOTIFY_PLAYLIST_ID_FOR_FROSTY_NIGHT',
  'Crisp Night': 'SPOTIFY_PLAYLIST_ID_FOR_CRISP_NIGHT',
  'Chill Night': 'SPOTIFY_PLAYLIST_ID_FOR_CHILL_NIGHT',
  'Mild Night': 'SPOTIFY_PLAYLIST_ID_FOR_MILD_NIGHT',
  'Balmy Night': 'SPOTIFY_PLAYLIST_ID_FOR_BALMY_NIGHT',
  'Warm Night': 'SPOTIFY_PLAYLIST_ID_FOR_WARM_NIGHT',
  'Tropical Night': 'SPOTIFY_PLAYLIST_ID_FOR_TROPICAL_NIGHT',
  'Sultry Night': 'SPOTIFY_PLAYLIST_ID_FOR_SULTRY_NIGHT',
  'Sweltering Night': 'SPOTIFY_PLAYLIST_ID_FOR_SWELTERING_NIGHT',
  'Sweltering Morning': 'SPOTIFY_PLAYLIST_ID_FOR_SWELTERING_MORNING',
  // Add more morning vibes as needed

  // Add more mappings for evening vibes

  // Add more mappings for daytime vibes

  // Add more mappings for nighttime vibes
};

    

    const playlistID = vibeToPlaylistID[vibeLabel];

    fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
      headers: {
        'Authorization': 'Bearer YOUR_SPOTIFY_ACCESS_TOKEN'
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
