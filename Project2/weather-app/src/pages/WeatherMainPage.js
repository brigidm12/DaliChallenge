import './styles.css';
// import { getAccessToken, redirectToAuthCodeFlow, fetchProfile } from './script.js';
import { WeatherMainPageWrapper } from "./WeatherMainPageWrapper";
import coldIcon from '../icons/coldIcon.png';
import coolIcon from '../icons//coolIcon.png';
import pleasantIcon from '../icons//pleasantIcon.png';
import warmIcon from '../icons/warmIcon.png';
import mellowIcon from '../icons/mellowIcon.png';
import chillIcon from '../icons/chillIcon.png';
import neutralIcon from '../icons/neutralIcon.png';
import positiveIcon from '../icons/positiveIcon.png';
import upbeatIcon from '../icons/upbeatIcon.png';
const React = require('react');
const { useState, useEffect } = require('react');



const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vibeLabel, setVibeLabel] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [vibeNumber, setVibeNumber] = useState(1);
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [location, setLocation] = useState("Your Location"); // Default location

  useEffect(() => {
    fetchWeatherData(); // Fetch weather data on initial render
  }, []);

  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = '5292c5a4f1ca85ff6dc8f5e859503689';
      const apiUrl = latitude && longitude ? `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}` : null;
      
      if (!apiUrl) return;

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


  // const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     const clientId = '7c7d4aa8eb8d4e9889e96199c2b63b7e';
  //     const params = new URLSearchParams(window.location.search);
  //     const code = params.get('code');

  //     if (!code) {
  //       redirectToAuthCodeFlow(clientId);
  //     } else {
  //       const accessToken = await getAccessToken(clientId, code);
  //       const userProfile = await fetchProfile(accessToken);
  //       setProfile(userProfile);
  //     }
  //   };

  //   authenticateUser();
  // }, []);

  const savePlaylist = () => {
    const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk'; // Replace with your Spotify access token
    const playlistID = vibeToPlaylistID[weatherToVibe];

    fetch(`https://api.spotify.com/v1/me/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save playlist');
      }
      console.log('Playlist saved successfully');
    })
    .catch(error => console.error('Error saving playlist:', error));
  };

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

  // Function to set location to London
  const setLocationToLondon = () => {
    setLocation("London");
    fetchWeatherData(51.5074, 0.1278);
  };

  // Function to set location to New York
  const setLocationToNewYork = () => {
    setLocation("New York");
    fetchWeatherData(40.7128, -74.0060);
  };

  // Function to set location to Los Angeles
  const setLocationToLA = () => {
    setLocation("Los Angeles");
    fetchWeatherData(34.0522, -118.2437);
  };

  // Function to set location to user's location
  const setLocationToUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLocation("Your Location");
      fetchWeatherData(latitude, longitude);
    });
  };


  useEffect(() => {
    if (vibeLabel && playlistData) {
      const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk'; // Replace with your Spotify access token      

      fetchPlaylistDetails(accessToken, vibeToPlaylistID[weatherToVibe])
        .then(data => setPlaylistDetails(data))
        .catch(error => console.error('Error setting playlist details:', error));
    }
  }, [vibeLabel, playlistData]);

  const fetchPlaylistDetails = async (accessToken, playlistID) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch playlist details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      return null;
    }
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



const handleLocationChange = (latitude, longitude) => {
  setLocation({ latitude, longitude });
  fetchWeatherData(latitude, longitude);
};

const handleCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      handleLocationChange(latitude, longitude);
    },
    (error) => {
      console.error('Error getting current location:', error);
    }
  );
};

const handleLondon = () => {
  handleLocationChange(51.5074, -0.1278); // London coordinates
  // set weather data
  setWeatherData()
};

const handleNewYork = () => {
  handleLocationChange(40.7128, -74.0060); // New York coordinates
};

const handleLosAngeles = () => {
  handleLocationChange(34.0522, -118.2437); // Los Angeles coordinates
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

  let timeOfDay = vibeParts[0];
  let tempVal = vibeParts[1];
  
  let timeOfDayString = '';
  let tempString = '';
  let vibeLevelString = '';
  let temperatureIcon;
  let vibeIcon;

  if(tempVal == 'Cold'){
    tempString = "Looks like its pretty chilly today!";
    temperatureIcon = coldIcon;
  }
  else if (tempVal == 'Cool') {
    tempString = "Tempatures are looking cool";
    temperatureIcon = coolIcon;
  }
  else if (tempVal == 'Pleasant') {
    tempString = "Temps look perfect!!";
    temperatureIcon = pleasantIcon;
  }
  else if (tempVal == 'Warm') {
    tempString = "Pretty hot out!";
    temperatureIcon = warmIcon;
  }



  if(vibeNumber == 1){
    vibeLevelString = "Mellow vibe is the way you're going!";
    vibeIcon = mellowIcon;
  }
  else if (vibeNumber == 2) {
    vibeLevelString = "It's time to chill out a little";
    vibeIcon = chillIcon;
  }
  else if (vibeNumber == 3) {
    vibeLevelString = "Neutrul mood sounds perfect";
    vibeIcon = neutralIcon;
  }
  else if (vibeNumber == 4) {
    vibeLevelString = "Bring out the positivity!";
    vibeIcon = positiveIcon;
  }
  else if (vibeNumber == 5) {
    vibeLevelString = "Looks like you're looking for an upbeat vibe. Lets get hyped!";
    vibeIcon = upbeatIcon;
  }




  if (timeOfDay == 'Morning') {
    timeOfDayString = 'Good morning!';
    if (tempVal == 'Cold') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Morning Freeze';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Morning Coziness';
        }
        if (vibeNumber == 3) {
            weatherToVibe = 'Morning High';
        }
        if (vibeNumber == 4) {
            weatherToVibe = 'Morning Movement';
        }
        if (vibeNumber == 5) {
            weatherToVibe = 'Morning Excitement';
        }
    } else if (tempVal == 'Cool') {
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
    }  
    
    else if(tempVal =="Pleasant"){
      if (vibeNumber == 1) {
          weatherToVibe = 'Serene Morning';
      }
      if (vibeNumber == 2) {
          weatherToVibe = 'Morning Easy';
      }
      if (vibeNumber == 3) {
          weatherToVibe = 'Soft Morning';
      }
      if (vibeNumber == 4) {
          weatherToVibe = 'Thrilling Morning';
      }
      if (vibeNumber == 5) {
          weatherToVibe = 'Morning High';
      }
  }
    
    else if (tempVal == 'Warm') {
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
    
} else if (timeOfDay == 'Daytime') {
    timeOfDayString = 'Hope you are having a great afternoon!';
    let tempVal = vibeParts[1];
    if (tempVal == 'Cold') {
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
    } else if (tempVal == 'Cool') {
        if (vibeNumber == 1) {
            weatherToVibe = 'Daytime Pleasantness';
        }
        if (vibeNumber == 2) {
            weatherToVibe = 'Daytime Joy';
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
    }
    
    else if(tempVal =="Pleasant"){
      if (vibeNumber == 1) {
          weatherToVibe = 'Light Day';
      }
      if (vibeNumber == 2) {
          weatherToVibe = 'Unwind Day';
      }
      if (vibeNumber == 3) {
          weatherToVibe = 'Mindful Day';
      }
      if (vibeNumber == 4) {
          weatherToVibe = 'Fun Day';
      }
      if (vibeNumber == 5) {
          weatherToVibe = 'Amped Day';
      }
  }

    else if (tempVal == 'Warm') {
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
} else if (timeOfDay == 'Nighttime') {
    timeOfDayString = 'Good evening!';
    let tempVal = vibeParts[1];
    if (tempVal == 'Cold') {
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
    } else if (tempVal == 'Cool') {
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
    } 
    
    else if(tempVal =="Pleasant"){
      if (vibeNumber == 1) {
          weatherToVibe = 'Tranquil Night';
      }
      if (vibeNumber == 2) {
          weatherToVibe = 'Soothing Night';
      }
      if (vibeNumber == 3) {
          weatherToVibe = 'Relaxing Night';
      }
      if (vibeNumber == 4) {
          weatherToVibe = 'Joyful Night';
      }
      if (vibeNumber == 5) {
          weatherToVibe = 'Blissful Night';
      }
  }
    
    
    else if (tempVal == 'Warm') {
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



    // Map vibes to Spotify playlist IDs
    const vibeToPlaylistID = {
      // Chill vibes
      'Morning Coziness': '37i9dQZF1EIedjqyJBu15e',
      'Morning High': '37i9dQZF1EIf68orkYt0JL',
      'Morning Movement': '37i9dQZF1EIfEjKERoVwUX',
      'Morning Freeze' : '37i9dQZF1EIerV7MkE62Mz',
      'Morning Glow' : '37i9dQZF1EIcRCHBhAAyyL',
      'Morning Excitement': '37i9dQZF1EIhnUFMxWO5dQ',
      'Morning Pleasant': '37i9dQZF1EIhiOZMveZpBE',
      'Frosty Morning': '37i9dQZF1EVKuMoAJjoTIw',
      'Refreshing Start': '7i9dQZF1EIhxsZ1zwdwMW',
      'Misty Morning': '37i9dQZF1EQn1VBR3CMMWb',
      'Sunny Morning': '37i9dQZF1EIg1CDFbbqhYq',
      'Breezy Sunrise': '37i9dQZF1DWYBO1MoTDhZI',
      'Energetic Morning': '37i9dQZF1EIe5NL6onTYp9',
      'Sunrise Serenity': '37i9dQZF1EIfAiavURxjpo',
      'Tropical Morning': '37i9dQZF1EIgrEQA5FONTg',
      'Summer Sunrise': '37i9dQZF1EIhmXwY1VouXP',
      'Morning Easy': '37i9dQZF1EIdDnHQZhcBHB',
      'Thrilling Morning': '_____',
      'Soft Morning': '37i9dQZF1DX0kbJZpiYdZl',
      'Serene Morning': '37i9dQZF1EIeQG8xzHUNqL',
      'Morning Pleasantness': '______',
      'Morning Joy': '37i9dQZF1EIerV7MkE62Mz',
      'Morning Refreshment': '_____',
      'Morning Happiness': '_____',
      'Morning Inspiration': '37i9dQZF1EIfFUEPTOA50z',


      // Daytime vibes
      'Morning Bliss': '37i9dQZF1EQncLwOalG3K7',
      'Daytime Calm': '37i9dQZF1EIgqlQOL5PM2t',
      'Daytime Coziness': '37i9dQZF1EIfBxIRe09W6f',
      'Daytime Comfort': '37i9dQZF1EIddwCdl7RQpj',
      'Light Day': '37i9dQZF1EVGJJ3r00UGAt',
      'Unwind Day': '37i9dQZF1EVJSvZp5AOML2',
      'Mindful Day': '37i9dQZF1EIhkGftn1D0Mh',
      'Fun Day': '37i9dQZF1EIcRCHBhAAyyL',
      'Amped Day': 'playlist/37i9dQZF1EIhMasSPCl82r',
      'Daytime Bliss': '37i9dQZF1EIcE10fGQVrZK',
      'Crisp Day': '37i9dQZF1EQmPV0vrce2QZ7',
      'Mild Afternoon': '37i9dQZF1EIdDnHQZhcBHB',
      'Frigid Daylight': '37i9dQZF1EIfkXslOKa2RE',
      'Sunny Afternoon': '37i9dQZF1EIf68orkYt0JL',
      'Balmy Day': '37i9dQZF1DX0kbJZpiYdZl',
      'Scorching Afternoon': '37i9dQZF1EIflC8jblmWYq',
      'Daytime Joy': '37i9dQZF1EIe0Dagt2506d',
      'Daytime Happiness': '37i9dQZF1E378LTlfUzuWN',
      'Daytime Inspiration': '37i9dQZF1DWUa8ZRTfalHk',
      'Daytime Refreshment': '37i9dQZF1EIdDn5P759aRj',
      'Daytime Pleasantness': '37i9dQZF1EpMtHbnarI75k',
      // Nighttime vibes
      'Chilly Night': '37i9dQZF1DWZrBs4FjpxlE',
      'Crisp Night': '37i9dQZF1EIerV7MkE62Mz',
      'Chill Night': '37i9dQZF1EIgqlQOL5PM2t',
      'Mild Night': '37i9dQZF1EIeQG8xzHUNqL',
      'Balmy Night': '37i9dQZF1CAmexaT6JzMuH', 
      'Warm Night': '37i9dQZF1EIgxk3CRmRMU3',
      'Tropical Night': '37i9dQZF1DXdpy4ZQQMZKm',
      'Sultry Night': '37i9dQZF1DWYs83FtTMQFw',
      'Sweltering Night': '37i9dQZF1DX5gQonLbZD9s',
      'Sweltering Morning': '37i9dQZF1E36UvPCbw0usS',
      'Nighttime Coziness': '37i9dQZF1EVGJJ3r00UGAt',
      'Nighttime Comfort': '37i9dQZF1DX4OzrY981I1W',
      'Nighttime Serenity': '37i9dQZF1EIe8WOUoGohcC',
      'Nighttime Peace': '37i9dQZF1EIcRCHBhAAyyL',
      'Nighttime Relaxation': '37i9dQZF1EQn4jwNIohw50',
      'Nighttime Pleasantness': '37i9dQZF1DX2yvmlOdMYzV',
      'Nighttime Joy': '37i9dQZEVXbw0hCDqcu6gc',
      'Nighttime Refreshment': '37i9dQZF1EIcNUtFW3CJZc',
      'Nighttime Happiness': '37i9dQZF1EpMtHbnarI75k',
      'Nighttime Inspiration': '37i9dQZF1EIeuoqE4dmQIB',
      'Nighttime Warmth': '37i9dQZF1EQp62d3Dl7ECY',
      'Nighttime Bliss': '37i9dQZF1EQn2GRFTFMl2A',
      'Relaxing Night': '37i9dQZF1EIfk2N1Y8uPoA',
      'Nighttime Excitement': '37i9dQZEVXcNjzMyuCr70k',
      'Soothing Night': '37i9dQZF1EIe0Dagt2506d',
      'Tranquil Night': '37i9dQZF1EIhxXwmyTC0jL',
      'Joyful Night': '37i9dQZF1EIe0Dagt2506d',
      'Blissful Night': '37i9dQZF1EIf68orkYt0JL',

      // Default case
      'default': '1lfieyG6FbXoFvaa8kusIe'
    };
    

console.log(vibeToPlaylistID);

 
    const fetchPlaylistData = () => {
      const accessToken = 'BQDsK_Mnz6tbVu_G5wEWkqHuW1-Xk2TWV1KwABesjy4mRBdLnMN1oRBzmNG7uXG7monr8AEpnV_C7IgGA-MiobB5xwl_GLoQ5Do196V4YOHLvZIfUZk';
      const playlistID = vibeToPlaylistID[weatherToVibe];
  
      fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch playlist data');
          }
          return response.json();
        })
        .then((data) => {
          setPlaylistData((prevState) => ({
            ...prevState,
            tracks: data.items.map((item) => item.track),
          }));
  
          // Fetch danceability and energy for each track
          const trackIDs = data.items.map((item) => item.track.id).join(',');
          fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIDs}`, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch audio features');
              }
              return response.json();
            })
            .then((audioFeaturesData) => {
              const danceability = audioFeaturesData.audio_features.map(
                (feature) => feature.danceability
              );
              const energy = audioFeaturesData.audio_features.map(
                (feature) => feature.energy
              );
              setPlaylistData((prevState) => ({
                ...prevState,
                danceability,
                energy,
              }));
            })
            .catch((error) =>
              console.error('Error fetching audio features:', error)
            );
        })
        .catch((error) => console.error('Error fetching playlist data:', error));
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
    <WeatherMainPageWrapper>
      <body>
    <div className="container">
      {/* Weather data JSX */}
      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather For {weatherData.name}</h2>
          {/* Weather data details */}
          <img src={temperatureIcon} alt="Temperature Icon" />

            {/* Display vibe icon */}
            <img src={vibeIcon} alt="Vibe Icon" />
            <p className="temperature">Temperature: <span>{weatherData.main.temp}&deg;F</span></p>
            <p className="humidity">Humidity: <span>{weatherData.main.humidity}%</span></p>
            <p className="wind-speed">Wind Speed: <span>{weatherData.wind.speed} mph</span></p>
            <p className="description">Description: <span>{weatherData.weather[0].description}</span></p>
            <p>{timeOfDayString}</p>
          <p>{tempString}</p>
          <p>{vibeLevelString}</p>
          {/* Buttons */}
          <div className="buttons">
            <button onClick={increaseVibeNumber}>Amp Up The Vibe!</button>
            <button onClick={decreaseVibeNumber}>Chill it Out</button>
          </div>
          <div className="buttons">
          <button onClick={handleCurrentLocation}>Current Location</button>
          <button onClick={handleLondon}>London</button>
          <button onClick={handleNewYork}>New York</button>
          <button onClick={handleLosAngeles}>Los Angeles</button>
        </div>
          
          {/* Spotify playlist iframe */}
          {vibeLabel && (
            <iframe
              title="Spotify Embed: Recommendation Playlist"
              src={`https://open.spotify.com/embed/playlist/${vibeToPlaylistID[weatherToVibe]}?utm_source=generator&theme=0`}
              width="100%"
              height="400"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}
          {/* Playlist details */}
          <button onClick={savePlaylist}>Save Playlist</button>
          <div className="playlist-details">
            {playlistDetails && (
              <div>
                <h2>Playlist Details</h2>
                <p>Total Tracks: {playlistDetails.tracks.total}</p>
                <p>Description: {playlistDetails.description}</p>
                <p></p>
                {/* Add more playlist details here */}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Loading and error handling */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
    </body>
    </WeatherMainPageWrapper>
  );
};

export default WeatherApp;