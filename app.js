document
    .getElementById("country-search-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const country = document.getElementById("country-input").value;

        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then((response) => response.json())
            .then((data) => {
                const countryData = data[0];
                displayCountryData(countryData);
                fetchWeatherData(countryData.capital);
            })
            .catch((error) =>
                console.error("Error fetching country data:", error)
            );
    });

function fetchWeatherData(city) {
    fetch(
        `https://api.weatherapi.com/v1/current.json?key=c4820775c3974636891185825242412&q=${city}`
    )
        .then((response) => response.json())
        .then((data) => displayWeatherData(data))
        .catch((error) => console.error("Error fetching weather data:", error));
}

function displayCountryData(data) {
    const container = document.getElementById("result-container");
    container.innerHTML = `
        <div class="col-md-4">
            <div class="card">
                <img src="${data.flags.png}" class="card-img-top" alt="${data.name.common} Flag">
                <div class="card-body">
                    <h5 class="card-title">${data.name.common}</h5>
                    <p class="card-text">Population: ${data.population}</p>
                    <p class="card-text">Capital: ${data.capital[0]}</p>
                    <button class="btn btn-info" onclick="showWeatherData('${data.capital[0]}')">More Details</button>
                </div>
            </div>
        </div>`;
}

function displayWeatherData(data) {
    const container = document.getElementById("result-container");
    container.innerHTML += `
        <div class="col-md-4 mt-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Weather in ${data.location.name}</h5>
                    <p class="card-text">Temperature: ${data.current.temp_c}°C</p>
                    <p class="card-text">Condition: ${data.current.condition.text}</p>
                </div>
            </div>
        </div>`;
}
