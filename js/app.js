const cityForm = document.querySelector('[data-js="city-form"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTime = document.querySelector('[data-js="city-time"]')
const cityTemperatureContainer = document
    .querySelector('[data-js="city-temperature"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityDetailsContainer = document.querySelector('[data-js="city-details"]')
const cityForecastsContainer = document.querySelector('[data-js="city-forecasts"]')
const mainContainer = document.querySelector('[data-js="main"]')
const updatedContainer = document.querySelector('[data-js="updated"]')

const subTitle = document.createElement('h3')
subTitle.textContent = 'Previsões para 5 dias'


const showCityCard = () => {
    const classHiddedExists = cityCard.classList.contains('hidded')
    if (classHiddedExists) {
        cityCard.classList.remove('hidded')
    }
}

const showTimeIcon = (WeatherIcon, WeatherText) => {
    timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" alt="${WeatherText}">`
    return timeIcon
}

const showDateUpdated = () => {
    const options = { month: 'short', day: 'numeric' };
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

const showCityInfo = async inputValue => {
    const [cityData] = await getCityData(inputValue)
    if (!cityData) {
        alert('Cidade não encontrada')
        return
    }
    showCityCard()
    const { LocalizedName, Key, Country } = cityData
    const [{ WeatherText, IsDayTime, Temperature, WeatherIcon }] = await getWeatherData(Key)

    const { DailyForecasts } = await getForecastsData(Key)

    DailyForecasts.map(({ Day, Temperature, Date: DateForecasts }) => {
        const forecastsDate = new Date(DateForecasts).toLocaleDateString()
        const formattedForecastsDate = forecastsDate.slice(0, 5)
        cityForecastsContainer.innerHTML += showForecast(Day, Temperature, formattedForecastsDate)
    })

    cityForecastsContainer.insertAdjacentElement('beforebegin', subTitle)
    cityTime.src = IsDayTime ? './src/day.svg' : './src/night.svg'
    timeIconContainer.innerHTML = showTimeIcon(WeatherIcon, WeatherText)
    cityNameContainer.textContent = LocalizedName + ' - ' + Country.ID
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value
    showTimeIcon(WeatherIcon, WeatherText)
    cityForm.reset()
}

const formSubmitEvent = event => {
    event.preventDefault()
    const inputValue = event.target.city.value
    if (!inputValue) {
        return
    }
    showCityInfo(inputValue)
    showDateUpdated()
    cityForecastsContainer.innerHTML = ''

}

cityForm.addEventListener('submit', formSubmitEvent)