export function getCoordintes() {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    return new Promise((success, error) => {
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}
  
