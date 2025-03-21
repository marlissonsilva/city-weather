const cityForm = document.querySelector('[data-js="city-form"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTime = document.querySelector('[data-js="city-time"]')
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
)
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityDetailsContainer = document.querySelector('[data-js="city-details"]')
const cityForecastsContainer = document.querySelector(
  '[data-js="city-forecasts"]'
)
const mainContainer = document.querySelector('[data-js="main"]')
const updatedContainer = document.querySelector('[data-js="updated"]')

const subTitle = document.createElement('h3')
subTitle.textContent = 'Previsões para 5 dias'

const showTimeIcon = (WeatherIcon, WeatherText) => {
  timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}">`
  return timeIcon
}

const showDateUpdated = () => {
  const options = { day: 'numeric', month: 'short' }
  const updateDate = new Date().toLocaleString('pt-BR', options)
  const updateHour = new Date().toLocaleTimeString('pt-BR').slice(0, 5)
  updatedContainer.textContent = `${updateDate} - ${updateHour}`
}

const showForecast = (Day, Temperature, formattedForecastsDate) => {
  const { Maximum, Minimum } = Temperature
  const { IconPhrase, Icon } = Day
  const HTMLTemplate = `
                <div class="infos">
                    <span class="day">${formattedForecastsDate}</span>
                    <img  title="${IconPhrase}"  src="./src/icons/${Icon}.svg" alt="Icone da condição climatica ${IconPhrase}">
                    <p>Mínima</p>
                    <span>${Minimum.Value}</span>
                    <span>&deg;C</span>
                    <p>Máxima</p>
                    <span>${Maximum.Value}</span>
                    <span>&deg;C</span>
                </div> 
          `
  return HTMLTemplate
}

const showCityInfo = async (inputValue) => {
  const [cityData] = await getCityData(inputValue)
  if (!cityData) {
    alert('Cidade não encontrada')
    return
  }
  const { LocalizedName, Key, Country } = cityData
  const [{ WeatherText, IsDayTime, Temperature, WeatherIcon }] =
    await getWeatherData(Key)

  const { DailyForecasts } = await getForecastsData(Key)
  DailyForecasts.forEach(({ Day, Temperature, Date: DateForecasts }) => {
    const forecastsDate = Intl.DateTimeFormat('pt-BR').format(
      new Date(DateForecasts)
    )
    const formattedForecastsDate = forecastsDate.slice(0, 5)
    cityForecastsContainer.innerHTML += showForecast(
      Day,
      Temperature,
      formattedForecastsDate
    )
  })

  cityForecastsContainer.insertAdjacentElement('beforebegin', subTitle)
  cityTime.src = `./src/${IsDayTime ? 'day' : 'night'}.svg`
  timeIconContainer.innerHTML = showTimeIcon(WeatherIcon, WeatherText)
  cityNameContainer.textContent = LocalizedName + ' - ' + Country.ID
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
  showTimeIcon(WeatherIcon, WeatherText)
  cityForm.reset()
  cityCard.classList.remove('hidded')
}

const formSubmitEvent = (event) => {
  event.preventDefault()
  const inputValue = event.target.city.value
  if (!inputValue) {
    return
  }
  showCityInfo(inputValue)
  showDateUpdated()
  localStorage.setItem('city', inputValue)
  cityForecastsContainer.innerHTML = ''
}

const showLocalStorageCity = () => {
  const city = localStorage.getItem('city')
  if (city) {
    showCityInfo(city)
    showDateUpdated()
    cityForecastsContainer.innerHTML = ''
  }
}

cityForm.addEventListener('submit', formSubmitEvent)
showLocalStorageCity()
