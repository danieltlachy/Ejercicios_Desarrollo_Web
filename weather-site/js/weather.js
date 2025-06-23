const API_KEY = "83e7abecd4cb70cd2ee5cbc6631f728f";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

async function getWeatherData() {
    let city = document.getElementById("txt_city").value.trim();

    try {
        let weatherResponse = await axios.get(WEATHER_URL, {
            params: {
                q: city,
                appid: API_KEY,
                lang: "es",
                units: "metric"
            }
        });

        var data = weatherResponse.data;
        displayWeatherData(data);
    } catch (error) {
        console.error("Error al consultar el clima:", error);
        alert("Hubo un problema al obtener el clima. Intente de nuevo.");
    }
}

function displayWeatherData(data) {
    let innerDiv = document.getElementById("interno");
    innerDiv.innerHTML = `
        <div class="weatherInfo" id="weatherHeader">
            <h2>Clima actual en ${data.name}</h2>
        <div id="resultados"></div>
    `;
    let resultadosDiv = document.getElementById("resultados");
    let iconCode = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultadosDiv.innerHTML = `
        <div class="weatherCards">
            <img src="${iconUrl}" alt="Icono del clima">
            <p>Clima: ${data.weather[0].description}</p>
            <p>Temperatura: ${Math.round(data.main.temp)}°C</p>
        </div>
    `;
}

async function getWeatherForecast() {
    let city = document.getElementById("txt_city").value.trim();

    try {
        let forecastResponse = await axios.get(FORECAST_URL, {
            params: {
                q: city,
                appid: API_KEY,
                lang: "es",
                units: "metric"
            }
        });

        var data = forecastResponse.data;
        displayForecastData(data);
    } catch (error) {
        console.error("Error al obtener el pronóstico:", error);
        alert("Hubo un problema al obtener el pronóstico. Intente de nuevo.");
    }
}

function displayForecastData(data) {
    let innerDiv = document.getElementById("interno");
    innerDiv.innerHTML = `
        <div class="weatherInfo" id="forecastHeader">
            <h2>Pronóstico de 5 días para ${data.city.name}</h2>
        </div>
        <div id="resultados"></div>
    `;

    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = '';

    let dailyForecasts = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    ).slice(0, 5);

    dailyForecasts.forEach((forecast) => {
        let date = new Date(forecast.dt_txt);
        let iconCode = forecast.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        let formattedDate = date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

        let forecastCard = `
            <div class="weatherCards">
                <h3>${formattedDate}</h3>
                <img src="${iconUrl}" alt="Icono del clima">
                <p>Clima: ${forecast.weather[0].description}</p>
                <p>Temperatura: ${Math.round(forecast.main.temp)}°C</p>
            </div>
        `;

        resultadosDiv.innerHTML += forecastCard;
    });
}