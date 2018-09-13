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
const error = document.querySelector(".error");
const container = document.querySelector(".container");

// Needed in order to let user pick wheather he or she wants the temp format in either celcius or fahrenheit
let isFahrenheit = true;

// Event handlers
form.addEventListener("submit", e => {
  const value = input.value;

  fetchWeather(value)
    .then(data => {
      // Index and count is needed in order to transition to next day
      let count = 0;
      const cityName = data.city.name;
      console.log(data);
      forecast.forEach((day, index) => {
        // Index and count is needed in order to transition to next day
        if (index !== 0) {
          count += 8;
        }
        // Obtains current weather object for specific day
        const currentWeather = data.list[count].weather[0];
        // Obtains current weather icon code
        const weatherIconCode = currentWeather.icon;
        // Obtains current weather icon code
        // Must exclude defualt http since will not work for https servers
        const weatherIconURL = `//openweathermap.org/img/w/${weatherIconCode}.png`;
        // Obtains description for current weather
        const weatherDescription = currentWeather.description;
        // Need to convert Kelvin to either Fahrenheit or Celsius
        const weatherForecast = data.list[count].main;

        const weatherTime = data.list[count].dt_txt;

        const formatedWeatherTimed = new moment(weatherTime).format(
          "MMM, Do YYYY"
        );
        const weatherHumid = weatherForecast.humidity;
        // Current tempature
        const weatherTemp = weatherForecast.temp;

        container.classList.remove("hidden-js");
        // Setting DOM node values
        setDOMValues(
          day,
          weatherIconURL,
          weatherDescription,
          weatherHumid,
          formatedWeatherTimed,
          weatherTemp
        );

        input.value = "";
      });
      document.querySelector(".weather-city").textContent = cityName;
    })
    .catch(err => {
      displayErrorMessage();
      input.value = "";
    });
  e.preventDefault();
});

fahrenheit.addEventListener("click", () => {
  if (!isFahrenheit) {
    isFahrenheit = true;
    forecast.forEach(day => {
      let weatherTemp = day.querySelector(".weather-temp");
      console.log(weatherTemp.textContent);
      // Edge case needed if user choses to pick celsius or fahrenheit button without displaying weather... Will return NaN otherwise
      if (parseInt(weatherTemp.textContent)) {
        weatherTemp.textContent = celsiusToFahrenheit(weatherTemp.textContent);
      }
    });
  }
});

celsius.addEventListener("click", () => {
  if (isFahrenheit) {
    isFahrenheit = false;
    forecast.forEach(day => {
      let weatherTemp = day.querySelector(".weather-temp");
      console.log(weatherTemp.textContent);
      // Edge case needed if user choses to pick celsius or fahrenheit button without displaying weather... Will return NaN otherwise
      if (parseInt(weatherTemp.textContent)) {
        weatherTemp.textContent = fahrenheitToCelsius(weatherTemp.textContent);
      }
    });
  }
});

// Helper functions

async function fetchWeather(zip) {
  const key = "bd6195cea8c0c0319222afc60b50be0d";
  try {
    // Must exclude defualt http since will not work for https servers
    const request = await fetch(
      `//api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}`
    );
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error();
  }
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin * 9) / 5 - 459.67).toFixed(0) + "°F";
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(0) + "°C";
}

function celsiusToFahrenheit(celsius) {
  return ((parseInt(celsius) * 9) / 5 + 32).toFixed(0) + "°F";
}

function fahrenheitToCelsius(fahrenheit) {
  return (((parseInt(fahrenheit) - 32) * 5) / 9).toFixed(0) + "°C";
}

function displayErrorMessage() {
  error.style.display = "block";
  setTimeout(() => {
    error.style.display = "none";
  }, 2000);
}

function setDOMValues(forecastDay, url, desc, humid, time, temp) {
  debugger;
  forecastDay.querySelector(".weather-icon").setAttribute("src", url);

  forecastDay.querySelector(".weather-description").textContent = desc;

  forecastDay.querySelector(
    ".weather-humidity"
  ).textContent = `Humidity: ${humid}%`;

  forecastDay.querySelector(".weather-time").textContent = time;

  if (isFahrenheit) {
    forecastDay.querySelector(".weather-temp").textContent = kelvinToFahrenheit(
      temp
    );
  } else {
    forecastDay.querySelector(".weather-temp").textContent = kelvinToCelsius(
      temp
    );
  }
}
