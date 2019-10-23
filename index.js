const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Starting server at ${port}`);
  });

app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response)=>
{
    database.find({}, (err, data) =>
    {
        response.json(data);
    });
});
app.post('/api', (request, response)=> {
    console.log(request.body);
    const timestamp = Date.now();
    const data =request.body;
    database.timestamp = timestamp;

    database.insert(data);
    response.json({
        status : "SUCCESS",
        timestamp : timestamp
    });
})

app.get('/weather/:latlon', async (request, response)=>
{
    const latlon = request.params.latlon.split(',');
    console.log(request.params.latlon);
    const lat = latlon[0];

    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const api_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});