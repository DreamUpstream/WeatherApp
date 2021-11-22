import * as getDays from './getDays';
import * as favGen from './favGenerator';

export function renderer(cityName, cityCode) {
    if (cityCode != "" && cityName != "" && cityCode != null && cityName != null)
    {
        document.getElementById("WeatherCity").innerText = "Weather in " + cityName + " ";
        let flag = document.createElement("img");
        flag.src = "../images/flag.png";
        flag.classList.add("flag");
        document.getElementById("WeatherCity").appendChild(flag);
    
    
        getDays.daysInfo(cityCode).then(info => {
            for (let d in info)
            {   
                
                let element1 = document.getElementById("day" + (+(d.split("|")[0])+1)).querySelectorAll("p")[0];
                let element2 = document.getElementById("day" + (+(d.split("|")[0])+1)).querySelectorAll("p")[1];
                let element3 = document.getElementById("day" + (+(d.split("|")[0])+1)).querySelectorAll("p")[2];
                //-----element 1------
                
                if (+(d.split("|")[1]) > 0)
                {
                    element1.innerText = " +" + d.split("|")[1] + " °C";
                }
                else if (+(d.split("|")[1]) == 0)
                {
                    element1.innerText = " " + d.split("|")[1] + " °C";
                }
                else if (+(d.split("|")[1]) < 0)
                {
                    element1.innerText = " " + d.split("|")[1] + " °C";
                }
                let weatherIcon = document.createElement("i");
                weatherIcon.classList.add("fas");
                weatherIcon.classList.add("fa-temperature-low");
                weatherIcon.classList.add("text-info");
                element1.prepend(weatherIcon);           
                //-----element 2------
                weatherIcon = document.createElement("i");
                let classes = favGen.conditionFavicon(info[d].split("|")[0]).split(" ");
                for (let c of classes) {
                    weatherIcon.classList.add(c);
                }
                switch (weatherIcon.classList.value){
                    case "fas fa-sun":
                        weatherIcon.classList.add("text-warning");
                        break;
                    case "fas fa-cloud-showers-heavy":
                        weatherIcon.classList.add("text-primary");
                        break;
                    case "fas fa-cloud":
                        weatherIcon.classList.add("text-secondary");
                        break;
                    case "far fa-snowflake":
                        weatherIcon.classList.add("text-info");
                        break;
                }
                let doesSplit = info[d].split("|")[0];
                if(doesSplit.includes("-"))
                    {
                        doesSplit = doesSplit.replace("-", " ");
                    }
                    element2.innerText = " " + doesSplit.charAt(0).toUpperCase() + doesSplit.slice(1);;
                if (element2.childNodes.length > 1)
                {
                    element2.removeChild("i");
                }
                element2.prepend(weatherIcon);   
                
                //-----element 3------
                weatherIcon = document.createElement("i");
                weatherIcon.classList.add("fas");
                weatherIcon.classList.add("fa-wind");
                weatherIcon.classList.add("text-light");
                element3.innerText = " " + info[d].split("|")[1] + " m/s";
                element3.prepend(weatherIcon);
                //------background-----
                let background = document.getElementById("mainForecast");
                switch (document.getElementById("day1").querySelectorAll("p")[1].innerText) {
                    case " Clear":
                        background.className =("weatherRenderer goodWeather d-flex flex-wrap");
                        break;
                    case " Na":
                        background.className =("weatherRenderer goodWeather d-flex flex-wrap");
                        break;
                    default:
                        background.className =("weatherRenderer badWeather d-flex flex-wrap");
                        break;
                }
            }
        });
    }

}






