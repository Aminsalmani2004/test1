
const cityInput = document.getElementById("cityInput");
const addInput = document.getElementById("add");
const cityoutput = document.getElementById("cityoutput");
const descriptionoutput = document.getElementById("description");
const tempoutput = document.getElementById("temp");
const windoutput = document.getElementById("wind");
const textInput= document.getElementById("cityInput")



const apiKey = "5972586c7cc498f812de0aa38897bf72";

async function GetWeather() {
    var weatherResult = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric&lang=fa
`)).json();
    setinfo(weatherResult);
};


function setinfo(data) {
    var cityName = data["name"];
    var description = data["weather"][0]["description"];
    var temp = data["main"]["temp"];
    var wind = data["wind"]["speed"];

    cityoutput.innerHTML=`نام شهر : ${cityName}`;
    descriptionoutput.innerHTML=`وضیعت هوا : ${description}`;
    tempoutput.innerHTML=`دما : ${temp}`;
    windoutput.innerHTML=`سرعت باد : ${wind}`;

};

addInput.addEventListener('click', GetWeather);
textInput.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            addInput.click();
        }
    });