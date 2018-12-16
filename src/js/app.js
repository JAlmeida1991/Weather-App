import { form, fahrenheit, celsius } from "./globals";
import {
  fetchWeatherSubmit,
  switchToCelsius,
  switchToFahrenheit
} from "./helpers";

form.addEventListener("submit", fetchWeatherSubmit);
fahrenheit.addEventListener("click", switchToFahrenheit);
celsius.addEventListener("click", switchToCelsius);
