const apiKey = "9ae0425b3b6e8607756fcb3f7477d75f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const container = document.getElementById("con");
const icon = document.getElementById("icon");
const info = document.getElementById("info");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("loc");
const temperatureElement = document.getElementById("temp");
const temp_min = document.getElementById("temp_min");
const temp_max = document.getElementById("temp_max");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const descriptionElement = document.getElementById("description");
const day = document.getElementById("day");
const date = document.getElementById("date");
searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const d = new Date();
      day.textContent = days[d.getDate()];
      date.textContent = d.toLocaleDateString();
      info.style.display = "block";
      container.style.height = "60vh";
      locationElement.textContent = data.name;
      humidity.textContent = data.main.humidity + "%";
      windSpeed.textContent = data.wind.speed + " Km/h";
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      temp_min.textContent = `${Math.round(data.main.temp_min)}°C`;
      temp_max.textContent = `${Math.round(data.main.temp_max)}°C`;
      descriptionElement.textContent = data.weather[0].description;
      const icon_img = data.weather[0].icon;
      icon.src = "https://openweathermap.org/img/w/" + icon_img + ".png";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
