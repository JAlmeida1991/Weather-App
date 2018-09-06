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
// const img = document.querySelector(".weather-icon");
// const city = document.querySelector(".weather-city");
// const description = document.querySelector(".weather-description");
// const temp = document.querySelector(".weather-temp");

// 0 8 16 24 32

form.addEventListener("submit", e => {
  const value = input.value;
  let count = 0;
  const myArr = [];
  fetchWeather(value)
    .then(data => {
      forecast.forEach((day, index) => {
        if (index !== 0) {
          count += 8;
        }
        // Obtaining fetched data
        const cityName = data.city.name;
        const currentWeather = data.list[count].weather[0];
        const weatherIconCode = currentWeather.icon;
        const weatherIconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
        const weatherDescription = currentWeather.description;
        myArr.push({
          cityName,
          currentWeather,
          weatherIconCode,
          weatherIconURL,
          weatherDescription,
          count
        });
      });
      console.log(myArr);
      // // Obtaining fetched data
      // const cityName = data.city.name;
      // const currentWeather = data.list[0].weather[0];
      // const weatherIconCode = currentWeather.icon;
      // const weatherIconURL = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
      // const weatherDescription = currentWeather.description;
      // // Need to convert Kelvin to either Fahrenheit or Celsius
      // const weatherForecast = data.list[0].main;
      // // Current tempature
      // const weatherTemp = weatherForecast.temp;
      // // Setting DOM node values
      // img.setAttribute("src", weatherIconURL);
      // description.textContent = weatherDescription;
      // city.textContent = cityName;
      // temp.textContent = kelvinToFahrenheit(weatherTemp);
      // input.value = "";
      // console.log(data);
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
