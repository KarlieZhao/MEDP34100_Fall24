const fetch = require('node-fetch');

exports.handler = async (event) => {
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
  const { city } = JSON.parse(event.body); // assuming you're sending city data in the request body
  console.log("API_KEY:", API_KEY); // Only for debugging. Remove before production!

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
