function today() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
export function daysInfo(cityCode) {
    return fetch(`/weather/forecast/find/${cityCode}`).then(r => r.json()).then(info => {
            let returner = {};
            let day = today();
            let thisHour = new Date().getHours() + ":00:00";
            let now = day + " " + thisHour;
            for (let timeStamp of info.forecastTimestamps) {
                if(Object.keys(returner).length < 4) {
                    if (timeStamp.forecastTimeUtc == now || timeStamp.forecastTimeUtc.split(" ")[1] == "12:00:00" && timeStamp.forecastTimeUtc.split(" ")[0] != day) {
                        returner[Object.keys(returner).length+"|"+Math.round(timeStamp.airTemperature)] = timeStamp.conditionCode+"|"+timeStamp.windSpeed;
                    }
                }
                else {
                    return returner;
                }
            }
            
        });
}
