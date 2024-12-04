var rowData = document.getElementById("rowData");
var findButton = document.getElementById("findButton");
var formInput = document.getElementById("formInput");

// Default city is Cairo 
var defaultCity = "Cairo";
getCity(defaultCity); 

findButton.addEventListener("click", function(){
    var city = formInput.value;
    getCity(city);
});

var cityApi = [];

async function getCity(city) {
    try {
        var cityUrl = `http://api.weatherapi.com/v1/forecast.json?key=9bdb5c15a4454c12a1e124856240412&q=${city}&days=3`;
        var cityResponse = await fetch(cityUrl);
        cityApi = await cityResponse.json();
        console.log(cityApi);
        displayData();
    } catch(error) {
        console.error("Error fetching weather data:", error);
    }
}

function formatDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.toLocaleString('en-US', { month: 'long' });
    return `${day} ${month}`;
}

function displayData() {
    var cartona = "";

    for (var i = 0; i < cityApi.forecast.forecastday.length; i++) {
        var day = cityApi.forecast.forecastday[i];
        var dateFormatted = formatDate(day.date);
        var dayOfWeek = new Date(day.date).toLocaleString('en-US', { weekday: 'long' });
        var cityName = cityApi.location.name;
        var temperature = `${day.day.avgtemp_c}°C`;
        var condition = day.day.condition.text;
        var humidity = `${day.day.avghumidity}%`;
        var windSpeed = `${day.day.maxwind_kph} km/h`;
        var windDirection = day.day.maxwind_dir ? day.day.maxwind_dir : "Unknown";
        var weatherImage = day.day.condition.icon;
        var minTemp = `${day.day.mintemp_c}°C`;

        if (i == 0) {
            cartona += `
            <div class="col-md-4 p-0 first rounded-end-0 rounded-start-4">
                <div class="card border-secondary mb-3 border-0">
                    <div class="header-1 card-header d-flex justify-content-between">
                        <span>${dayOfWeek}</span>
                        <span>${dateFormatted}</span>
                    </div>
                    <div class="body-1 card-body text-secondary p-4">
                        <h5 class="card-title">${cityName}</h5>
                        <h1 class="temperature-1 py-2">${temperature}</h1>
                        <img src="${weatherImage}" alt="Weather icon" width="90">
                        <p class="text-primary">${condition}</p>
                        <div class="d-flex justify-content-start">
                            <div class="me-3">
                                <img src="images/icon-umberella.png" alt="Umbrella" width="20">
                                <span>${humidity}</span>
                            </div>
                            <div class="me-3">
                                <img src="images/icon-wind.png" alt="Wind" width="20">
                                <span>${windSpeed}</span>
                            </div>
                            <div class="me-3">
                                <img src="images/icon-compass.png" alt="Compass" width="20">
                                <span>${windDirection}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else if (i == 1) {
            cartona += `
            <div class="col-md-4 p-0 second rounded-0">
                <div class="card border-secondary mb-3 border-0">
                    <div class="header-2 card-header text-center">${dayOfWeek}</div>
                    <div class="body-2 card-body text-secondary text-center">
                        <img class="mb-3" src="${weatherImage}" alt="Weather icon" width="60">
                        <h3 class="temperature-2 m-0">${temperature}</h3>
                        <span class="text-white m-5">${minTemp}</span>
                        <p class="text-primary mt-3">${condition}</p>
                    </div>
                </div>
            </div>`;
        } else {
            cartona += `
            <div class="col-md-4 third rounded-start-0 rounded-end-4">
                <div class="card border-secondary mb-3 border-0">
                    <div class="header-3 card-header text-center">${dayOfWeek}</div>
                    <div class="body-3 card-body text-secondary text-center">
                        <img class="mb-3" src="${weatherImage}" alt="Weather icon" width="60">
                        <h3 class="temperature-2 m-0">${temperature}</h3>
                        <span class="text-white">${minTemp}</span>
                        <p class="text-primary mt-3">${condition}</p>
                    </div>
                </div>
            </div>`;
        }
    }

    rowData.innerHTML = cartona;
}
