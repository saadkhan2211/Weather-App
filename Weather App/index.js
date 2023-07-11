const apiKey = "9606f6c82a6fd438190ca02e04156161";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weather = ["Clouds", "Rain", "Clear", "Mist", "Snow", "Drizzle"];
var cityWeather = '';
var
 ResStatus = false;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + '&appid='+apiKey);
    var data = await response.json();

    if (response.status == 404) {
        ResStatus = false;
        document.getElementById("error").style.display = "block";
        document.getElementById("cardBody").style.display= "none";
    }
    else{
        ResStatus = true;
        document.getElementById("error").style.display = "none";
        document.getElementById("cardBody").style.display= "block";

        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) +'&deg;C';
    
        var speedUnit = (data.wind.speed * 3.6).toFixed(2);
        document.getElementById("wind").innerHTML = speedUnit +' KM/H';
        document.getElementById("humidity").innerHTML = data.main.humidity +' %';
    
        // console.log(data);
        cityWeather = data.weather[0].main;
    
        const weatherImg = document.querySelector("div > #weatherImg");
    
        for (let i = 0; i < weather.length; i++) {
            if (cityWeather == weather[i]) {
                weatherImg.src = "images/"+cityWeather.toLowerCase()+".png";
            }
        }
    }
}

function searchBtn() {
    const searchBox = document.querySelector("div > #search");
    checkWeather(searchBox.value);
    // console.log(ResStatus);
    if (ResStatus) {
        setInterval(() => {
            checkWeather(searchBox.value);
            // console.log(searchBox.value);
        }, 1000);
    }
}



