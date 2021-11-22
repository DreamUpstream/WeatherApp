import * as getDays from './getDays';
import * as getWeekday from './weekdayNameGenerator';
import * as favGen from './favGenerator';
function getDayName(dateStr, locale)
{
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function renderMajorCities(cities) {
    for (let c of cities){
        getDays.daysInfo(c).then(info => {
            let counter = 1;
            for (let d in info)
            {
                console.log(d.split("|")[1]);
                if (+(d.split("|")[1]) >= 0) {
                    document.getElementById(c).querySelectorAll("td")[counter].innerText = "" + d.split("|")[1] + " °C⠀";
                }
                
                else {
                    document.getElementById(c).querySelectorAll("td")[counter].innerText = "  " + d.split("|")[1] + " °C   ";
                }
                
                let weatherIcon = document.createElement("i");
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
                
                document.getElementById(c).querySelectorAll("td")[counter].appendChild(weatherIcon);
                counter++;
            }
        });
        
    }
}
document.getElementById("day3").childNodes[1].innerText = getWeekday.getWeekday(1);
document.getElementById("day4").childNodes[1].innerText = getWeekday.getWeekday(2);
document.getElementById("date1").innerText = getWeekday.getWeekday(1);
document.getElementById("date2").innerText = getWeekday.getWeekday(2);
renderMajorCities(["Vilnius", "Kaunas", "Klaipeda", "Siauliai", "Panevezys", "Alytus", "Marijampole", "Mazeikiai", "Jonava", "Utena"]);