export function conditionFavicon(condition){
    let day = "fas fa-cloud";
    switch (condition) {
        case "clear":
            day = "fas fa-sun";
            break;
        case "moderate-rain":
        case "heavy-rain":
            day = "fas fa-cloud-showers-heavy";
            break;
        case "light-snow":
        case "moderate-snow":
        case "heavy-snow":
            day = "far fa-snowflake"
            break;
    }
    return day;
}