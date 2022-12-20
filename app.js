let weather ={
    apiKey : "65b7a1faefeee0fc0b5ab15aad14e394",
    unit: "metric",

    determineUnit: function(){
        if(document.querySelector(".checkbox").checked){
            this.unit = "imperial"; 
        }else{
            this.unit = "metric";
        }
        console.log(this.unit);
    },

    fetchWeather: function(city){
        console.log(city);
        this.determineUnit();
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            +"&units="+
            this.unit +
            "&appid=" 
            + this.apiKey    
        )
            .then((response)=> response.json())
            .then((data) => {
                fetch(
                    "https://api.openweathermap.org/geo/1.0/direct?q=" 
                    + city 
                    + "&appid="
                    + this.apiKey   
                )
                .then((response2) => response2.json())
                .then((data2)=>{ this.displayWeather(data, data2)});
                })

    },

    displayWeather: function(data, data2 ){
        const {country} = data2[0];
        const {state} = data2[0];
        const{ name } = data;
        const {icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        console.log(state);
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".country").innerHTML = country;

        document.querySelector(".state").innerHTML = (state? state + ",": "");
        document.querySelector(".state").style.display = state? "block" : "none";
        document.querySelector(".city").innerText = name + ",";
        document.querySelector(".temp").innerText = temp.toFixed(1)+ ((this.unit=="metric")? "°C": "°F");
        document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".feels").innerText = "Feels Like: " + feels_like.toFixed(1) + (this.unit=="metric"? "°C": "°F");

        document.querySelector(".wind").innerText = "Windspeed: " + ((this.unit=="metric")? (speed* 18/5).toFixed(1) + " kmh": speed.toFixed(1) + " mph");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"  + name + "?Landscape')"
        document.querySelector(".unitText").innerHTML = this.unit.charAt(0).toUpperCase() + this.unit.substring(1);

        
    }, 
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}; 

document.querySelector(".search button").addEventListener("click", function(){
        weather.search();
}); 

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }

});

document.querySelector(".checkbox").addEventListener("change", function(){
    weather.search();
}); 


//default search
document.addEventListener("DOMContentLoaded",function(){

    document.querySelector(".search-bar").value = "New York City";
    weather.fetchWeather("New York City"); 

});

