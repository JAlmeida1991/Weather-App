// API URL:
//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}

// ICON URL:
//http://openweathermap.org/img/w/${img}.png

// Declare DOM nodes
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const img = document.querySelector(".weather-icon");
const city = document.querySelector(".weather-city");
const description = document.querySelector(".weather-description");
const temp = document.querySelector(".weather-temp");

form.addEventListener("submit", e => {
  const value = input.value;
  fetchWeather(value)
    .then(data => {
      // Obtaining fetched data
      const cityName = data.city.name;
      const currentWeather = data.list[0].weather[0];
      const weatherIconCode = currentWeather.icon;
      const weatherIconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
      const weatherDescription = currentWeather.description;
      // Need to convert Kelvin to either Fahrenheit or Celsius
      const weatherForecast = data.list[0].main;
      // Current tempature
      const weatherTemp = weatherForecast.temp;
      // Setting DOM node values
      img.setAttribute("src", weatherIconURL);
      description.textContent = weatherDescription;
      city.textContent = cityName;
      temp.textContent = kelvinToFahrenheit(weatherTemp);
      console.log(kelvinToFahrenheit(weatherTemp));
      console.log(celsiusToKelvin(weatherTemp));
    })
    .catch(err => console.log(err));
  e.preventDefault();
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
