// Define the WeatherStation class
class WeatherStation {
    //====================== constructor ==============================================
    // The constructor is a special method that initializes new objects.
    // Create the constructor with an argument "location", and
    // declare the following fields:
    // location, temperature, humidity,pressure, weatherCondition, readings

    // When you create multiple objects from a class, each object has its own set of instance variables. 
    // The this keyword allows you to access and modify these instance-specific variables.

    //======================== getter ============================================
    // the getCurrentWeather method (getter)
    // This method returns an object with the current weather data.
    // getter & setter methods get/set a single property
    // and follow a naming convention => get PropertyName()/set PropertyName().

    //======================== methods ============================================
    getAverageTemperature(days = 1) {
        const msInDay = 24 * 60 * 60 * 1000;
        const recentReadings = this.readings.filter(reading =>
            (new Date() - reading.timestamp) <= days * msInDay
        );
        const sum = recentReadings.reduce((sum, reading) => sum + reading.temperature, 0);
        return recentReadings.length > 0 ? sum / recentReadings.length : null;
    }

    // This method simulates reading data from weather sensors, or fetching data via API calls.
    takeNewReading() {
        // Simulate readings
        this.temperature = Math.round((Math.random() * 35 - 5) * 10) / 10; // -5 to 30°C
        this.humidity = Math.round(Math.random() * 100);
        this.pressure = Math.round((Math.random() * 50 + 975) * 10) / 10; // 975 to 1025 hPa

        // Determine weather condition based on readings
        if (this.humidity > 80) {
            this.weatherCondition = 'Rainy';
        } else if (this.temperature > 25) {
            this.weatherCondition = 'Sunny';
        } else if (this.temperature < 5) {
            this.weatherCondition = 'Cold';
        } else {
            this.weatherCondition = 'Cloudy';
        }

        // Store the reading
        // this.readings is an array that holds JS objects 
        this.readings.push({
            timestamp: new Date(),
            temperature: this.temperature,
            humidity: this.humidity,
            pressure: this.pressure,
            condition: this.weatherCondition
        });
    }

    displayCurrentWeather() {
        const weather = this.getCurrentWeather();
        console.log(`
        Current weather in ${weather.location}:
        Temperature: ${weather.temperature}°C
        Humidity: ${weather.humidity}%
        Pressure: ${weather.pressure} hPa
        Condition: ${weather.condition}
      `);
    }
}

// Create an instance and use the WeatherStation class

// call the setter 
// call the getter

// // Simulate weather readings over time
for (let i = 0; i < 12; i++) {
    // Take readings and display the current weather and average temperature
}