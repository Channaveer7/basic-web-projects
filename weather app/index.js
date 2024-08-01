const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="255970c6349e795e7803ae96d81329d4";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }

    else{
        displayError("please enter city");
    }
    
});

async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
} 

function displayWeatherInfo(data){
    const {name:city ,
           main:{temp,humidity},
           weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex"    
    
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const weatheremoji=document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent=`${(temp -273.15).toFixed(1)}°c`;
    humiditydisplay.textContent=`humidity :${humidity}%`;
    descdisplay.textContent=description;

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(descdisplay);
}

function getWeatherEmoji(weatherId){
    
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex"
    card.appendChild(errorDisplay);

}