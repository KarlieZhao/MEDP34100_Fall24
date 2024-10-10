// Define the WeatherStation class
class WeatherStation {
    //====================== constructor ==============================================
    // The constructor is a special method that initializes new objects.
    constructor(location) {
        // The this keyword refers to the current instance of the class when used inside a class. 
        // When you create multiple objects from a class, each object has its own set of instance variables. 
        // The this keyword allows you to access and modify these instance-specific variables.
        this.location = location;
        this.temperature = 0;
        this.humidity = 0;
        this.pressure = 1000; // in hPa
        this.weatherCondition = 'Clear';
        this.readings = [];
    }
    //======================== getter and setter ============================================
    // the getCurrentWeather method (getter)
    // This method returns an object with the current weather data.
    // getter & setter methods get/set a single property
    // and follow a naming convention => get PropertyName()/set PropertyName().
    // We typically use an underscore prefix for the internal property to avoid naming conflicts.
    get temperature() {
        return this._temperature;
    }
    set temperature(newTemperature) {
        if (typeof newTemperature === 'number' && newTemperature >= -50 && newTemperature <= 50) {
            this._temperature = newTemperature;
        } else {
            throw new Error('Invalid temperature. Must be a number between -50 and 50.');
        }
    }
    //======================== method ============================================
    // This method provides a clean interface for accessing/modifying data.
    getCurrentWeather() {
        return {
            location: this.location,
            temperature: this.temperature,
            humidity: this.humidity,
            pressure: this.pressure,
            condition: this.weatherCondition
        };
    }

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
        // We're using this.readings as an array hold JS objects for better organizing the weather data.
        this.readings.push({
            timestamp: new Date(),
            temperature: this.temperature,
            humidity: this.humidity,
            pressure: this.pressure,
            condition: this.weatherCondition
        });
    }

    // Add the displayCurrentWeather method
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

// Create an instance under the WeatherStation class
const cityWeather = new WeatherStation('New York');

// Simulate weather readings over time
for (let i = 0; i < 12; i++) {
    // Display the current weather and average temperature
    cityWeather.takeNewReading();
    cityWeather.displayCurrentWeather();
    console.log(`Average temperature over the last day: ${cityWeather.getAverageTemperature().toFixed(1)}°C`);


    // ${} => template literal interpolation; allows embedding expressions inside string literals. 
}