// Functions
async function getVisual(query){
  const visualAPI = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=777777777777777777&s=${query}`, {mode: 'cors'});
  const visualData = await visualAPI.json();
  visual.src = visualData.data.images.downsized_medium.url;
}

async function weatherFunction(query) {
  input.value = '';

  try {
    const weatherAPI = await fetch(`https://api.weatherapi.com/v1/current.json?key=7777777777777777777&q=${query}&aqi=no`, {mode: 'cors'});
    const weatherData = await weatherAPI.json();
    const weatherPhoto = await getVisualJSON(weatherData.current.condition.text);

    Promise.all([weatherAPI, weatherData, weatherPhoto]).then(() => { 
      visual.src = weatherPhoto.data.images.downsized_medium.url;
      displayWeather(weatherData);
      weatherContent.style.display = "block";
    });
  } catch {
    getVisual('error');
    weatherContent.style.display = "none";
  }
}

async function getVisualJSON(condition) {
  const visualAPIJSON = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=777777777777777&s=${condition}`, {mode: 'cors'});
  return await visualAPIJSON.json();
}

async function displayWeather(weatherData) {
  // GOAL: Revise the DOM to generate the city's weather like so:
  //  <h2>Davao City Weather now...</h2>
  //  <div class="condition">
  //     <img class="icon" src="https://cdn.weatherapi.com/weather/64x64/day/122.png">
  //     <h3>Overcast</h3>
  //  </div>
  //  <h4 class="temp_c">Temperature: 10 degrees Celsius</h4>
  //  <h4 class="precip_mm">Precipitation: 10 mm</h4>
  //  <h4 class="wind_kph">Wind speed: 69 kph</h4>

  const h2 = document.querySelector('h2');
  const icon = document.querySelector('.icon');
  const h3 = document.querySelector('h3');
  const temp_c = document.querySelector('.temp_c');
  const precip_mm = document.querySelector('.precip_mm');
  const wind_kph = document.querySelector('.wind_kph');

  h2.textContent        = `${weatherData.location.name} weather now...`;
  icon.src              = `https:${weatherData.current.condition.icon}`;
  h3.textContent        = weatherData.current.condition.text;
  temp_c.textContent    = `Temperature: ${weatherData.current.temp_c} ºC`;
  precip_mm.textContent = `Precipitation: ${weatherData.current.temp_c} mm`;
  wind_kph.textContent  = `Wind speed: ${weatherData.current.temp_c} kph`;
}


// Initial variables
const input = document.querySelector('.form-control');
const search = document.querySelector('.btn');
const weatherContent = document.querySelector('.weather-content');
const visual = document.querySelector('.visual');

// Initialization
search.addEventListener("click", () => weatherFunction(input.value));
getVisual('waiting');
