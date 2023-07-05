const API_KEY = "3c42e01c0cf5437c928feb081ca04486";

function getLocation(){
    loc = navigator.geolocation.getCurrentPosition();
    console.log(loc);
}