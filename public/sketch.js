let lat, lon;
if('geolocation' in navigator)
{
    
    navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            console.log(lat, lon);
            
            const api_url = `weather/${lat},${lon}`;
            const fetchH_response = await fetch(api_url);
            const json = await fetchH_response.json();
            
            const summary = json.currently.summary;
            const temperature = json.currently.temperature;
            document.getElementById('sumary').textContent = json.currently.summary;
            document.getElementById('temperature').textContent = json.currently.temperature;
            
            const data = {lat, lon, summary, temperature};
            let options = {
                        method : 'POST',
                        headers : 
                        {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(data)
                    };
            fetch('/api', options).then((response)=>response.json()).then((data)=>console.log(data));
        });
}else
{
    console.log("NOT");
}
