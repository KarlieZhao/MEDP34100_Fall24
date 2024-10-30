async function fetchWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherCard = document.getElementById('weather-card');
    const errorMessage = document.getElementById('error-message');
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!cityInput) {
        displayError("Please enter a city name.");
        return;
    }

    // Show loading feedback
    weatherCard.classList.add('hidden');
    errorMessage.classList.add('hidden');
    weatherCard.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
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