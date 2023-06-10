const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('curren-weather-items');
const timeZone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const months = ['january', 'february', 'march', 'april', 'may', 'jun', 'jul', 'august', 'september', 'oktober', 'november', 'december'];

const API_KEY = '5965720d4c526f323f76cc80d9c8d81d';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour > 12 ? 'PM' : 'AM'

  timeE1.innerHTML = hourIn12HrFormat + ':' + minutes + ' ' +
    `<span id="am-pm">${ampm}</span>`

  dateE1.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000)

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {

    let (latitude, longitude) = success.coords;
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=&appid=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data);
      showWeatherData(data);
    })
  })
}

function showWeatherData(data) {

  let {
    humidity,
    pressure,
    sunrise,
    sunset,
    wind_speed
  } = data.current;

  currentWeatherItemsE1.innerHTML = `<div class="weather-item"><div>Humidity</div>
  <div>${humidity}%</div>
  </div>
  <div class="weather-item">
  <div>Pressure</div>
  <div>${pressure}</div>
  </div>

  <div class="weather-item">
  <div>Wind Speed</div>
  <div>${wind_speed}</div>
  </div>

  <div class="weather-item">
  <div>Sunrise</div>
  <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
  </div>

  <div class="weather-item">
  <div>Sunset</div>
  <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
  </div>
  `
}