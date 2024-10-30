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

    try {
        const response = await fetch('/.netlify/functions/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: cityInput }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Check if the expected data structure is present
        if (!data.sys || !data.main || !data.weather) {
            throw new Error('Unexpected response format. City may not exist.');
        }

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
