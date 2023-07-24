const cityForm = document.querySelector('[data-js="city-form"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTime = document.querySelector('[data-js="city-time"]')
const cityTemperatureContainer = document
    .querySelector('[data-js="city-temperature"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityDetailsContainer = document.querySelector('[data-js="city-details"]')


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

const showCityInfo = async inputValue => {
    const [{ LocalizedName, Key }] = await getCityData(inputValue)
    const [{ WeatherText, IsDayTime, Temperature, WeatherIcon }] = await getWeatherData(Key)
   
    cityTime.src = IsDayTime ? './src/day.svg' : './src/night.svg'

    timeIconContainer.innerHTML = showTimeIcon(WeatherIcon, WeatherText)
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value
    showTimeIcon(WeatherIcon, WeatherText)
    cityForm.reset()
}


const formSubmitEvent = async event => {
    event.preventDefault()
    const inputValue = event.target.city.value

    showCityInfo(inputValue)
    showCityCard()
}



cityForm.addEventListener('submit', formSubmitEvent)