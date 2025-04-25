window.onload = function() {
    // API configuration (using your original API key)
    var apiKey = "ef842d646433e02e92aa0a396a8a5e1d";
    var city = "Toronto";
    var units = "metric";
    
    // Build the API URL
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    console.log("API URL:", url);

    // Get DOM elements
    var out_location = document.getElementById("location");
    var out_temperature = document.getElementById("temperature");
    var out_conditions = document.getElementById("conditions");

    // Create and send the request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "json";
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = xhr.response;
                
                // Display city name
                out_location.innerHTML = data.name;
                
                // Display temperature
                var temp = Math.round(data.main.temp);
                out_temperature.innerHTML = `${temp}°C`;
                
                // Display weather icon and description
                var iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                var description = data.weather[0].description;
                description = description.charAt(0).toUpperCase() + description.slice(1) + ".";
                
                out_conditions.innerHTML = `
                    <img id="weather-icon" src="${iconUrl}" alt="${description}">
                    ${description}
                `;
                
            } else {
                out_location.innerHTML = "Error loading weather data";
                console.error("API Error:", xhr.status, xhr.statusText);
            }
        }
    };
};