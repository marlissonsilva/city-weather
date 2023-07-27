const APIKey = 'naqO1Cz7jep67fktd97pTBWrPhULaNKe'
const baseUrl = 'https://dataservice.accuweather.com/'

const getCityUrl = cityName => `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherUrl = cityKey => `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const getForecastsUrl = cityKey => `${baseUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${APIKey}&language=pt-br&metric=true`


const fetchData = async url => {
    try {

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Não foi possível obter os dados!`)
        }

        return response.json()
    } catch ({ name, message }) {
        alert(`${name} : ${message}`)
    }
}


const getCityData = cityName => fetchData(getCityUrl(cityName))

const getWeatherData = async cityKey => await fetchData(getWeatherUrl(cityKey))

const getForecastsData = async cityKey => await fetchData(getForecastsUrl(cityKey))
