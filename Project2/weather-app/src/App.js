const React = require('react');
const { useState, useEffect } = require('react');



const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vibeLabel, setVibeLabel] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [vibeNumber, setVibeNumber] = useState(1);


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
      const { vibe, vibeNumber } = getVibeLabel(weatherData);
      setVibeLabel(vibe);
      setVibeNumber(vibeNumber);
    }
  }, [weatherData]);

  const getVibeLabel = (weatherData) => {
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description.toLowerCase();
    let vibeNumber = 3;
  
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
      vibeNumber-=3;
    } else if (temp >= 32 && temp < 60) {
      vibe += ', Cool';
      vibeNumber-=1;
    } else if (temp >= 60 && temp < 80) {
      vibe += ', Pleasant';
      vibeNumber+=1;
    } else {
      vibe += ', Warm';
      vibeNumber+=2;
    }

    // Humidity-based vibes
    if (humidity < 30) {
      vibeNumber+=1;
    } else if (humidity >= 30 && humidity < 70) {
      vibeNumber+=2;
    } else {
      vibeNumber-=1;
    }

    // Wind-based vibes
    if (windSpeed < 5) {
      vibeNumber+=2;
    } else if (windSpeed >= 5 && windSpeed < 15) {
      vibeNumber+=1;
    } else {
      vibeNumber-=2;
    }

    // // Description-based vibes
    if (description.includes('rain')) {
      vibeNumber-=2;
    } else if (description.includes('snow')) {
      vibeNumber-=1;
    } else if (description.includes('clear')) {
      vibeNumber+=2;
    } else if (description.includes('cloud')) {
      vibeNumber-=1;
    }

    if(vibeNumber > 5){
      vibeNumber = 5;
    }
    else if(vibeNumber < 0){
      vibeNumber = 0;
    }

    vibe+=', '.concat((vibeNumber.toString()));

    return { vibe, vibeNumber };
  };




  useEffect(() => {
    if (vibeLabel) {
      fetchPlaylistData();
    }
  }, [vibeLabel]);
//!!!!!!!!!!!!!!!!!!
  
  // Function to increase the vibe number
  const increaseVibeNumber = () => {
    setVibeNumber(vibeNumber => Math.min(vibeNumber + 1, 10));
  };

  // Function to decrease the vibe number
  const decreaseVibeNumber = () => {
    setVibeNumber(vibeNumber => Math.max(vibeNumber - 1, 0));
    
  };

  // function convertVibeStringToConditions(vibeString) {

  //   // Return the extracted conditions
  //   return {
  //     timeOfDay,
  //     temperature,
  //     humidity,
  //     windCondition
  //   };
  // }
  const { vibe, newVibeNumber } = weatherData ? getVibeLabel(weatherData) : { vibe: '', newVibeNumber: 0 };

  let weatherToVibe = null;
  let vibeParts = vibe.split(', ');
  if (vibeParts[1] == 'Morning') {
      if (vibeParts[2] == 'Cold') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Morning Coziness';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Morning Coziness';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Morning Coziness';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Morning Coziness';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Morning Coziness';
          }
      } else if (vibeParts[2] == 'Cool') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Morning Pleasantness';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Morning Joy';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Morning Refreshment';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Morning Happiness';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Morning Inspiration';
          }
      } else if (vibeParts[2] == 'Warm') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Morning Comfort';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Morning Refreshment';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Morning Happiness';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Morning Bliss';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Morning Excitement';
          }
      }
  } else if (vibeParts[1] == 'Daytime') {
      if (vibeParts[2] == 'Cold') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Daytime Calm';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Daytime Coziness';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Daytime Comfort';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Daytime Serenity';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Daytime Peace';
          }
      } else if (vibeParts[2] == 'Cool') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Daytime Pleasantness';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Daytime Joy';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Daytime Refreshment';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Daytime Happiness';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Daytime Inspiration';
          }
      } else if (vibeParts[2] == 'Warm') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Daytime Comfort';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Daytime Refreshment';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Daytime Happiness';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Daytime Bliss';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Daytime Excitement';
          }
      }
  } else if (vibeParts[1] == 'Nighttime') {
      if (vibeParts[2] == 'Cold') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Nighttime Coziness';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Nighttime Comfort';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Nighttime Serenity';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Nighttime Peace';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Nighttime Relaxation';
          }
      } else if (vibeParts[2] == 'Cool') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Nighttime Pleasantness';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Nighttime Joy';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Nighttime Refreshment';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Nighttime Happiness';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Nighttime Inspiration';
          }
      } else if (vibeParts[2] == 'Warm') {
          if (newVibeNumber == 1) {
              weatherToVibe = 'Nighttime Comfort';
          }
          if (newVibeNumber == 2) {
              weatherToVibe = 'Nighttime Warmth';
          }
          if (newVibeNumber == 3) {
              weatherToVibe = 'Nighttime Happiness';
          }
          if (newVibeNumber == 4) {
              weatherToVibe = 'Nighttime Bliss';
          }
          if (newVibeNumber == 5) {
              weatherToVibe = 'Nighttime Excitement';
          }
      }
  } else {
      // Handle any other combinations or default case
  }
  

// Add mappings for daytime vibes
// const weatherToVibe = {
//   // const timeOfDay = vibeParts[0];
//   // const temperature = vibeParts[1];
//   // con


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
      'Frigid Daylight': '37i9dQZF1DX0kbJZpiYdZl',
      'Sunny Afternoon': '37i9dQZF1DX0kbJZpiYdZl',
      'Frosty Night': '37i9dQZF1DX0kbJZpiYdZl',
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
      'Mild Night': '37i9dQZF1DX0kbJZpiYdZl',
      //https://open.spotify.com/playlist/37i9dQZF1DX0kbJZpiYdZl?si=f3fc401dea6340fa
      // Add more morning vibes as needed
  
      // Add more mappings for evening vibes
  
      // Add more mappings for daytime vibes
  
      // Add more mappings for nighttime vibes
      };



  const fetchPlaylistData = () => {
    const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk'; // Replace with your Spotify access token      
    const playlistID = vibeToPlaylistID[vibeLabel];

      fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          //'Bearer 7c7d4aa8eb8d4e9889e96199c2b63b7e'

          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch playlist data');
        }
        return response.json();
      })
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

    // Existing state and useEffect hooks...
      
    //   return (
    //     <div>
    //       {/* Replace existing JSX code for rendering weather data */}
    //       {weatherData && (
    //         <div>
    //           <h2>Current Weather</h2>
    //           <p>Location: {weatherData.name}</p>
    //           <p>Temperature: {weatherData.main.temp}&deg;F</p>
    //           <p>Humidity: {weatherData.main.humidity}%</p>
    //           <p>Wind Speed: {weatherData.wind.speed} mph</p>
    //           <p>Description: {weatherData.weather[0].description}</p>
    //           <p>Vibe Label: {vibeLabel}</p>
    //           <p>Playlist ID: {vibeToPlaylistID[weatherToVibe[vibeLabel]]}</p>
    //           {vibeLabel && (
    //             <p>Corresponding Vibe: {weatherToVibe[vibeLabel]}</p>
    //           )}
              
    //         </div>
    //       )}
    //       {loading && <div>Loading...</div>}
    //       {error && <div>Error: {error}</div>}
    //     </div>
    //   );
    // };
    
   return (
  <div>
    {/* Existing weather data JSX */}
    {weatherData && (
      <div>
        <h2>Current Weather</h2>
        <p>Location: {weatherData.name}</p>
        <p>Temperature: {weatherData.main.temp}&deg;F</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} mph</p>
        <p>Description: {weatherData.weather[0].description}</p>
        <p>Vibe Label: {vibeLabel}</p>
        <button onClick={increaseVibeNumber}>Increase Vibe</button>
        <button onClick={decreaseVibeNumber}>Decrease Vibe</button>
        {/* Add a conditional check for weatherToVibe */}
        {weatherToVibe && (
          <iframe
            title="Spotify Embed: Recommendation Playlist "
            src={`https://open.spotify.com/embed/playlist/${vibeToPlaylistID[weatherToVibe[vibeLabel]]}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}
        <p>Playlist ID: {vibeToPlaylistID[weatherToVibe[vibeLabel]]}</p>
        {vibeLabel && (
          <div>
            <p>Corresponding Vibe: {weatherToVibe[vibeLabel]}</p>
            {/* Check if playlist data is available */}
            {playlistData && (
              <div>
                <h3>Corresponding Playlist</h3>
                <p>Name: {playlistData.name}</p>
                <p>Total Followers: {playlistData.followers.total}</p>
                {/* Render playlist images if available */}
                {playlistData.images && playlistData.images.length > 0 && (
                  <img src={playlistData.images[0].url} alt="Playlist Cover" />
                )}
                {/* Link to the playlist */}
                <p>
                  Playlist URL:{" "}
                  <a href={playlistData.external_urls.spotify}>
                    {playlistData.external_urls.spotify}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    )}
    {/* Loading and error handling */}
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
  </div>
);

   };
    

export default WeatherApp;

