// Declare DOM nodes
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const forecast = document.querySelectorAll(".forecast");
const fahrenheit = document.querySelector(".fahrenheit");
const celsius = document.querySelector(".celsius");
const error = document.querySelector(".error");
const container = document.querySelector(".container");
const spinner = document.querySelector(".spinner");

const state = { isFahrenheit: true };

export {
  form,
  input,
  submit,
  forecast,
  fahrenheit,
  celsius,
  error,
  container,
  spinner,
  state
};
