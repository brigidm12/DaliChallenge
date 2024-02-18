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

  //Gets their position
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  //Gets and sets their vibe and vibeNumber
  useEffect(() => {
    if (weatherData) {
      let { weatherDescription} = getVibeLabel(weatherData);
      let { vibeNumber } = getVibeNumber(weatherData);
      setVibeLabel(weatherDescription);
      setVibeNumber(vibeNumber);
    }
  }, [weatherData]);



  const getVibeLabel = (weatherData) => {
    const temp = weatherData.main.temp;

    let weatherDescription = 'Neutral';
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      weatherDescription = 'Morning';
    } else if (hour >= 12 && hour < 18) {
      weatherDescription = 'Daytime';
    } else {
      weatherDescription = 'Nighttime';
    }
  

    // Temperature-based vibes
    if (temp < 32) {
      weatherDescription += ', Cold';
    } else if (temp >= 32 && temp < 60) {
      weatherDescription += ', Cool';
    } else if (temp >= 60 && temp < 80) {
      weatherDescription += ', Pleasant';
    } else {
      weatherDescription += ', Warm';
    }

    // Humidity-based vibes


    return { weatherDescription};
  };






  const getVibeNumber = (weatherData) => {
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description.toLowerCase();
    
    let vibeNumber = 3;
    // console.log(vibeNumber);
  
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
    else if(vibeNumber < 1){
      vibeNumber = 1;
    }

    return { vibeNumber };
  };







  useEffect(() => {
    if (vibeLabel) {
      fetchPlaylistData();
    }
  }, [vibeLabel]);
//!!!!!!!!!!!!!!!!!!
  
  // Function to increase the vibe number
// Function to increase the vibe number
const increaseVibeNumber = () => {
  console.log("increase");
  setVibeNumber(vibeNumber => Math.min(vibeNumber + 1, 5)); // Ensure vibeNumber stays within range [1, 5]
};



// Function to decrease the vibe number
const decreaseVibeNumber = () => {
  console.log("decrease");
  setVibeNumber(vibeNumber => Math.max(vibeNumber - 1, 1)); // Ensure vibeNumber stays within range [1, 5]
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
  let { weatherDescription} = weatherData ? getVibeLabel(weatherData) : { weatherDescription: ''};
  // let { newVibeNumber } = weatherData ? getVibeNumber(weatherData) : {newVibeNumber: 0 };

  let weatherToVibe = '';
  let vibeParts = weatherDescription.split(', ');
  console.log("Hi");
  console.log(vibeParts);
  console.log(vibeParts[0]);
  console.log(vibeParts[1]);
  console.log(vibeNumber);
  if (vibeParts[1] == 'Morning') {
    if (vibeParts[2] == 'Cold') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Morning Coziness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Morning Coziness';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Morning Coziness';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Morning Coziness';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Morning Coziness';
        }
    } else if (vibeParts[2] == 'Cool') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Morning Pleasantness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Morning Joy';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Morning Refreshment';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Morning Happiness';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Morning Inspiration';
        }
    } else if (vibeParts[2] == 'Warm') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Morning Comfort';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Morning Refreshment';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Morning Happiness';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Morning Bliss';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Morning Excitement';
        }
    }
} else if (vibeParts[0] == 'Daytime') {
    if (vibeParts[2] == 'Cold') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Daytime Calm';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Daytime Coziness';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Daytime Comfort';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Daytime Serenity';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Daytime Peace';
        }
    } else if (vibeParts[1] == 'Cool') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Daytime Pleasantness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Daytime Joy';
            console.log("BHJBHJHB");
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Daytime Refreshment';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Daytime Happiness';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Daytime Inspiration';
        }
    } else if (vibeParts[2] == 'Warm') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Daytime Comfort';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Daytime Refreshment';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Daytime Happiness';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Daytime Bliss';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Daytime Excitement';
        }
    }
} else if (vibeParts[1] == 'Nighttime') {
    if (vibeParts[2] == 'Cold') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Nighttime Coziness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Nighttime Comfort';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Nighttime Serenity';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Nighttime Peace';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Nighttime Relaxation';
        }
    } else if (vibeParts[2] == 'Cool') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Nighttime Pleasantness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Nighttime Joy';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Nighttime Refreshment';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Nighttime Happiness';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Nighttime Inspiration';
        }
    } else if (vibeParts[2] == 'Warm') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Nighttime Comfort';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Nighttime Warmth';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Nighttime Happiness';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Nighttime Bliss';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Nighttime Excitement';
        }
    }
} else {
    // Handle any other combinations or default case
}
console.log(weatherToVibe);



    // Map vibes to Spotify playlist IDs
// Map vibes to Spotify playlist IDs
// Map vibes to Spotify playlist IDs
const vibeToPlaylistID = {
  // Morning vibes
  'Morning Coziness': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Pleasantness': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Joy': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Refreshment': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Happiness': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Inspiration': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Comfort': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Bliss': '1lfieyG6FbXoFvaa8kusIe',
  'Morning Excitement': '1lfieyG6FbXoFvaa8kusIe',
  // Daytime vibes
  'Daytime Calm': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Coziness': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Comfort': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Serenity': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Peace': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Pleasantness': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Joy': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Refreshment': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Happiness': '1lfieyG6FbXoFvaa8kusIe',
  'Daytime Inspiration': '1lfieyG6FbXoFvaa8kusIe',
  // Nighttime vibes
  'Nighttime Coziness': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Comfort': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Serenity': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Peace': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Relaxation': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Pleasantness': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Joy': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Refreshment': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Happiness': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Inspiration': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Warmth': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Bliss': '1lfieyG6FbXoFvaa8kusIe',
  'Nighttime Excitement': '1lfieyG6FbXoFvaa8kusIe',
};


console.log(vibeToPlaylistID);

  const fetchPlaylistData = () => {
    const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk'; // Replace with your Spotify access token      
    const playlistID = vibeToPlaylistID[weatherToVibe];

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
    <p>{vibeNumber}</p>
    <p>Description: {weatherData.weather[0].description}</p>
    <p>Vibe Label: {weatherToVibe}</p>
    <p>Vibe ID: {vibeToPlaylistID[weatherToVibe]}</p>
    <button onClick={increaseVibeNumber}>Increase Vibe</button>
    <button onClick={decreaseVibeNumber}>Decrease Vibe</button>
    {/* Change this part */}
    {vibeLabel && (
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/${vibeToPlaylistID[weatherToVibe]}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: '360px' }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    )}
    {/* End of change */}
    <p>Playlist ID: {vibeToPlaylistID[weatherToVibe]}</p>
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










