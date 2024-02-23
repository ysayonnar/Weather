//служебные константы
const apiKey = '5853856ad96c0c89c910c4f5e97f14e1'

//Обьекты
const searchButton = document.querySelector('.search-button')
const seacrhField = document.querySelector('.search')
const city = document.querySelector('.city')
const desc = document.querySelector('.description')
const currentTemp = document.querySelector('.temperature')
const tempMin = document.querySelector('.tempMin')
const tempMax = document.querySelector('.tempMax')
const wind = document.querySelector('.wind')
const feelsLike = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const iconBlock = document.querySelector('.icon-block')

//темповые переменные
let cityName = ''


function getCoords(name){
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${apiKey}`
    return fetch(geocodeUrl)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            return response.json().then(error => {
                const e = new Error('The name of the city is incorrect.')
                e.data = error
                throw e
            })
        })
}

function getWeather(coord){
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
	return fetch(weatherUrl)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            return response.json().then(error => {
                console.log('error')
				const e = new Error('The name of the city is incorrect.')
				e.data = error
				throw e
			})
        })
}

function setInfo(weather, name){
    city.innerHTML = name
    desc.innerHTML = weather.weather[0].main
    currentTemp.innerHTML = `${Math.floor(weather.main.temp - 273)}°C`
    tempMin.innerHTML = `Min ${Math.floor(weather.main.temp_min - 273)}°C`
    tempMax.innerHTML = `Max ${Math.floor(weather.main.temp_max - 273)}°C`
    feelsLike.innerHTML = `Feels like ${Math.floor(weather.main.feels_like - 273)}°C`
    wind.innerHTML = `Wind speed is ${weather.wind.speed} m/s`
    humidity.innerHTML = `Hummidity is ${weather.main.humidity}%`
}

function enablePicture(code){
    iconBlock.innerHTML = ''
    let img = document.createElement('img')
    img.setAttribute('class', 'weather-icon')
    img.setAttribute('src', `src/png/${code}.png`)
    iconBlock.appendChild(img)
}

searchButton.addEventListener('click', e =>{
    cityName = seacrhField.value
    getCoords(cityName)
        .then(data =>{
            let coords = {
				lat: 0,
				lon: 0,
			}
            coords.lat = data[0].lat
            coords.lon = data[0].lon
            return coords
        })
        .then(coords => {
            let weatherInfo = {}
            getWeather(coords)
                .then(data => {
                    setInfo(data, cityName)
                    enablePicture(data.weather[0].icon)
                })
        })
})
