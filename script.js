// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Network response:', response.status, response.statusText);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherData = {
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            };
            return weatherData;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            throw error;
        });
}

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<p>Loading...</p>';
    
    fetchWeather(location)
        .then(data => {
            weatherInfo.innerHTML = `
                <h2>Weather in ${location}</h2>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Description: ${data.description}</p>
                <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon">
            `;
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
