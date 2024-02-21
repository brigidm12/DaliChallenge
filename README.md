# Spotify Playlist Recommendations Web App

## Overview
This web application is built using React and aims to provide Spotify playlist recommendations based on current weather conditions. The application fetches weather data from the OpenWeatherMap API and uses it to determine the appropriate vibe for the current weather. It then suggests a Spotify playlist matching that vibe.

## Features
- Fetches current weather data based on user's location using geolocation
- Determines the vibe based on temperature, humidity, wind speed, and weather description
- Suggests Spotify playlists matching the vibe
- Allows users to view detailed weather information including temperature, humidity, wind speed, and weather description
- Offers options to set the location manually to London, New York, Los Angeles, or user's current location

## Technologies Used
- React.js
- OpenWeatherMap API
- Spotify API

## How to Use
1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Obtain API keys for OpenWeatherMap and Spotify API.
4. Replace the placeholders for API keys in the code with your actual keys.
5. Run the application using `npm start`.
6. Access the application in your browser at `http://localhost:3000`.

## Code Structure
- `WeatherApp.js`: Main component containing the logic for fetching weather data and recommending playlists.
- `WeatherMainPageWrapper.js`: Component for styling the main page layout.
- `styles.css`: CSS styles for the application.

## Usage
### Setting Location
- Click on the buttons to set the location to London, New York, Los Angeles, or your current location.
- Alternatively, you can allow the application to access your current location using the browser's geolocation feature.

### Interacting with Weather Data
- View detailed weather information such as temperature, humidity, wind speed, and weather description.
- Receive suggestions for Spotify playlists based on the current weather vibe.

### Adjusting Vibe
- Increase or decrease the vibe level to fine-tune the playlist recommendations.


