// API URL:
//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}

// ICON URL:
//http://openweathermap.org/img/w/${img}.png

// Moment format:
// new moment().format('MMM, Do YYYY h:mma') // "Sep, 6th 2018 3:00am"

// Declare DOM nodes
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const forecast = document.querySelectorAll(".forecast");
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");

// Needed in order to let user pick wheather he or she wants the temp format in either celcius or fahrenheit
let isFahrenheit = true;

form.addEventListener("submit", e => {
  const value = input.value;
  let count = 0;
  fetchWeather(value)
    .then(data => {
      const cityName = data.city.name;
      forecast.forEach((day, index) => {
        if (index !== 0) {
          count += 8;
        } // Obtaining fetched data
        const currentWeather = data.list[count].weather[0];
        const weatherIconCode = currentWeather.icon;
        const weatherIconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
        const weatherDescription = currentWeather.description;
        // Need to convert Kelvin to either Fahrenheit or Celsius
        const weatherForecast = data.list[count].main;

        const weatherTime = data.list[count].dt_txt;
        const formatedWeatherTimed = new moment(weatherTime).format(
          "MMM, Do YYYY"
        );
        // Current tempature
        const weatherTemp = weatherForecast.temp;
        // Setting DOM node values
        day.querySelector(".weather-icon").setAttribute("src", weatherIconURL);
        day.querySelector(
          ".weather-description"
        ).textContent = weatherDescription;
        day.querySelector(".weather-time").textContent = formatedWeatherTimed;
        day.querySelector(".weather-temp").textContent = kelvinToFahrenheit(
          weatherTemp
        );
        input.value = "";
        console.log(data);
        console.log(weatherTime);
      });
      document.querySelector(".weather-city").textContent = cityName;
    })
    .catch(err => console.log(err));
  e.preventDefault();
});

fahrenheit.addEventListener("click", () => {
  forecast.forEach(day => {
    let weatherTemp = day.querySelector(".weather-temp");
    weatherTemp.textContent = celsiusToFahrenheit(weatherTemp.textContent);
  });
});

celsius.addEventListener("click", () => {
  forecast.forEach(day => {
    let weatherTemp = day.querySelector(".weather-temp");
    weatherTemp.textContent = fahrenheitToCelsius(weatherTemp.textContent);
  });
});

async function fetchWeather(zip) {
  const key = "bd6195cea8c0c0319222afc60b50be0d";
  try {
    const request = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}`
    );
    const response = await request.json();
    return response;
  } catch (err) {
    console.log("error");
  }
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin * 9) / 5 - 459.67).toFixed(2) + "°F";
}

function celsiusToKelvin(kelvin) {
  return (kelvin - 273.15).toFixed(2) + "°C";
}

function celsiusToFahrenheit(celsius) {
  return ((parseInt(celsius) * 9) / 5 + 32).toFixed(2) + "°F";
}

function fahrenheitToCelsius(fahrenheit) {
  return (((parseInt(fahrenheit) - 32) * 5) / 9).toFixed(2) + "°C";
}
