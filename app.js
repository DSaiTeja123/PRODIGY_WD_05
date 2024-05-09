document.addEventListener('DOMContentLoaded', function() {
  const submitBtn = document.getElementById('submit');
  const searchInput = document.getElementById('search');

  submitBtn.addEventListener('click', function(e) {
      e.preventDefault(); 
      const location = searchInput.value.trim();
      if (location) {
          fetchWeatherData(location);
      } else {
          displayError('Please enter a location to search.');
      }
  });
});

function fetchWeatherData(location) {
  const apiKey = 'f5be296b0c0cf6d27d016644fb0eb224';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to retrieve weather data. Please check the location and try again.');
          }
          return response.json();
      })
      .then(data => {
          updateWeatherDisplay(data);
      })
      .catch(error => {
          displayError(error.message);
      });
}

function updateWeatherDisplay(data) {
  document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('description').textContent = `Weather: ${data.weather[0].main} (${data.weather[0].description})`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('feels_like').textContent = `Feels Like: ${data.main.feels_like}°C`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind_speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayError(message) {
  const weatherContainer = document.getElementById('weatherResult');
  weatherContainer.innerHTML = `<div class="error" style="color: red;">Error: ${message}</div>`;
}