const {
    response
} = require("express");

async function fetchWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherCard = document.getElementById('weather-card');
    const errorMessage = document.getElementById('error-message');

    if (!cityInput) {
        displayError("Please enter a city name.");
        return;
    }

    // Show loading feedback
    weatherCard.classList.add('hidden');
    errorMessage.classList.add('hidden');
    weatherCard.innerHTML = "<p>Loading...</p>";

    //fetching data using await and try/catch
    // try {
    //     //fetch data
    //     const response = await fetch(url);
    //     manipulating the url by adding api key & city name to fetch data;
    //     if (!response.ok) throw new Error("Fetch failed");

    //     const data = await response.json();
    //     // console.log(data);
    //     displayWeather(data);
    // } catch (error) {
    //     console.error("error message:" + error);
    //     //if fetching is not successful, print status code: 
    //     // 404 => data not existing
    //     // 500 => server side issue
    //     // ...
    //     displayError(error);
    // }

    // call the fetching function in weather.js using HTTP method: POST
    try {
        const response = await fetch('/.netlify/functions/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: cityInput
            }),
        })
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weather-card');
    weatherCard.classList.remove('hidden');

    weatherCard.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}