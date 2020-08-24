//Week 5 Homework Code
//Functions

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-weather").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector(
    "#humid"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${response.data.weather[0].description}`;
}

function searchCity(city) {
  let apiKey = "12f8e457ba0d8b6c71f0515f7f8b361b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
//Changes city name to what you search
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Bonus

function searchLocation(position) {
  let apiKey = "12f8e457ba0d8b6c71f0515f7f8b361b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//Code from last week
let now = new Date();
//Date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

//Time
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay}`;
let h3 = document.querySelector("h3");
h3.innerHTML = `${currentHours}:${currentMinutes}`;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);
let searchForCity = document.querySelector("#search-form");
searchForCity.addEventListener("submit", handleSubmit);
searchCity("New York");
