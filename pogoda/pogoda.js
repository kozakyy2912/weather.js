var humidity, pressure, temperature, windSpeed, weatherSummary, object, currentHumidity;

//1
function element(id){
	return document.getElementById(id);
}

//2
window.onload=function(){
	humidity=element('current-humidity');
	pressure=element('current-pressure');
	temperature=element('current-temperature');
	windSpeed=element('current-wind-speed');
	weatherSummary=element('weather-summary');
}

//3
function getWeather() {
	//console.log(window.navigator);
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){

		//console.log(position);
		var lat=position.coords.latitude,
			long=position.coords.longitude;
		//console.log(lat,long);

		showWeather(lat,long);

		});

	}
	else{
		alert('Could not get your location');
	}
}

//4
function showWeather(lat,long){
	var url=`https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`,
	script=document.createElement('script');
	script.src=url;
	document.getElementsByTagName('head')[0].appendChild(script);

	displayWeather(object);

}

//5
function displayWeather(object){
	console.log(object);
	
	humidity.innerText='Humidity: ' + humidityPerсentage(object.currently.humidity) + '%';
	pressure.innerText='Pressure: ' + object.currently.pressure;
	temperature.innerText='Temperature: ' + temperaturePerсentage(object.currently.temperature) + '°С';
	windSpeed.innerText='Wind speed: ' + windSpeedKM(object.currently.windSpeed) + ' km/h';
}

//6
function humidityPerсentage(k){
	return Math.round(k*100);
}

//7
function temperaturePerсentage(t){
	return Math.round((t-31)/1.8);
}

//8
function windSpeedKM(sp){
	return Math.round(sp*1.851999999984);
}