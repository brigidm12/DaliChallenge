const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://localhost:3000/callback';
const scope = 'user-top-read user-read-email'; // Add necessary scopes for accessing user's top artists and email

document.getElementById('login-btn').addEventListener('click', () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
});

window.addEventListener('load', () => {
    if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        
        if (accessToken) {
            fetchTopArtists(accessToken);
        }
    }
});

async function fetchTopArtists(accessToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const topArtists = data.items.map(artist => artist.name);
            const soulmates = await findSoulmates(accessToken, topArtists);
            displaySoulmates(soulmates);
            displayMix(topArtists, soulmates);
        } else {
            console.error('Failed to fetch top artists:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching top artists:', error.message);
    }
}

async function findSoulmates(accessToken, topArtists) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=3&seed_artists=${topArtists.join(',')}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const soulmates = data.tracks.map(track => track.artists[0].name);
            return soulmates;
        } else {
            console.error('Failed to find soulmates:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error finding soulmates:', error.message);
        return [];
    }
}

function displaySoulmates(soulmates) {
    const soulmatesList = document.getElementById('soulmates');
    soulmatesList.innerHTML = '';
    soulmates.forEach(artist => {
        const listItem = document.createElement('li');
        listItem.textContent = artist;
        soulmatesList.appendChild(listItem);
    });
    document.getElementById('soulmates-list').style.display = 'block';
}

function displayMix(userTopArtists, soulmates) {
    const mix = userTopArtists.concat(soulmates);
    const mixList = document.getElementById('mixed-artists');
    mixList.innerHTML = '';
    mix.forEach(artist => {
        const listItem = document.createElement('li');
        listItem.textContent = artist;
        mixList.appendChild(listItem);
    });
    document.getElementById('mix-btn').style.display = 'block';
    document.getElementById('mixed-list').style.display = 'block';
}
