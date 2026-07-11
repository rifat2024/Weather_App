
const apiKey = '302c2e66707ab2f7f68933ab07160b46';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click',function(){
  const city = cityInput.value.trim();
  if(city){
    getWeather(city);
  }else{
    message.textContent = 'Please Insert a City';
  }
})

async function getWeather(city) {
try{
  message.textContent = 'Loading...';
  weatherInfo.classList.add('hidden');

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&cache=no-store`);

  const data = await res.json();
  console.log(data);
  
  
  if(data.cod == 404 || data.cod == '404'){
    message.textContent = 'City Not Found';
    return;
  }

  message.textContent = '';
  displayWeather(data);
}catch(err){
  message.textContent = 'Error Fetching Data';
  console.log(err);
  
}
}

function displayWeather(data){
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('temp').textContent = `${Math.round(data.main)}°C`;
  document.getElementById('description').textContent = `${data.weather[0].description}`;

  cityInput.value = '';
  weatherInfo.classList.remove('hidden');
}
