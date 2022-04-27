let backbtn = document.querySelectorAll('.backbtn');
let card = document.querySelectorAll('.card');
let infotext = document.querySelectorAll('.info-text');
let input = document.querySelector('#input');
let locationbtn = document.querySelector('#locationbtn');
let wdetail = document.querySelectorAll('.wdetail');
let wshort = document.querySelectorAll('.wshort');
let state = document.querySelectorAll('.state');
let country = document.querySelectorAll('.country');
let tempdetail = document.querySelectorAll('.tempdetail');
let humiddetail = document.querySelectorAll('.humiddetail');
let wIcon = document.querySelectorAll('.wicon');

let api_key = 'c2ac2d197ea11eb2993aadfb74558713';
let api;



input.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        fetchData();
    }
});



backbtn[0].addEventListener('click', function (e) {
    card[0].classList.remove('active');
    infotext[0].classList.remove('success');
    infotext[0].classList.remove('error');
    infotext[0].innerHTML = 'Please Enter a valid location.';
    input.value = '';
});


locationbtn.addEventListener('click', function (e) {
    getLocation();
})

function fetchData() {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}&units=metric`;
    requestApi();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=c2ac2d197ea11eb2993aadfb74558713' + '&units=metric';
            requestApi();

        });
    } else {
        infotext[0].classList.add('error');
        infotext[0].innerHTML = 'Geolocation is not supported by this browser.';
    }
}
async function requestApi() {
    let wobj = await fetch(api);
    let wres = await wobj.json();
    weatherDetail(wres);
}

function weatherDetail(data) {
    if (data.cod === 200) {
        // console.log(data);
        infotext[0].classList.add('success');
        infotext[0].innerHTML = 'Getting Weather Info...';

        if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
            wIcon[0].setAttribute('src', './images/storm.svg');
        }
        else if (data.weather[0].id >= 300 && data.weather[0].id <= 531) {
            wIcon[0].setAttribute('src', './images/rain.svg');
        }

        else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
            wIcon[0].setAttribute('src', './images/snow.svg');
        } 
        else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
            wIcon[0].setAttribute('src', './images/haze.svg');
        }

        else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
            wIcon[0].setAttribute('src', './images/cloud.svg');

        } 
        else if (data.weather[0].id === 800) {
            wIcon[0].setAttribute('src', './images/clear.svg');
        }

        wdetail[0].innerHTML = Math.round(data.main.temp) + '&deg;C';
        wshort[0].innerHTML = data.weather[0].description;
        state[0].innerHTML = data.name;
        country[0].innerHTML = data.sys.country;
        tempdetail[0].innerHTML = Math.round(data.main.feels_like) + '&deg;C';
        humiddetail[0].innerHTML = data.main.humidity + '%';
        card[0].classList.add('active');
    } else if (data.cod === '404') {
        infotext[0].classList.add('error');
        infotext[0].innerHTML = data.message;
    }

    else {
        infotext[0].classList.add('error');
        infotext[0].innerHTML = 'Something went wrong!';
    }
}


