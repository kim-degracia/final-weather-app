function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    mintes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
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

function searchLocation(position) {
  let apiKey = "12f8e457ba0d8b6c71f0515f7f8b361b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#day-and-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = getDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);
let searchForCity = document.querySelector("#search-form");
searchForCity.addEventListener("submit", handleSubmit);
let celsiusTemp = null;
searchCity("New York");
