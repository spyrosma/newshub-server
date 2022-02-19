const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const req = require('express/lib/request');
dotenv.config();
// let lat=36.7336;
// let lon=24.4981;

app.use(cors());
app.get('/', (req, res) => {
  res.send('go to /weather to see weather')
});
app.get('/weather', (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
  axios.get(api)
    .then(response => {
      res.json(response.data);
      
    })
    .catch(error => {
      console.log(api);
    });
});

app.get('/news', (req,res) => {
  const url='https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?';
    const country='country=';
    const category='&category=';
    const searchPre = 'q=';
    const api='&apiKey='+process.env.REACT_APP_NEWS_API_KEY;


    let countryCode = req.query.country;
    let categoryName=req.query.category;
    let search = req.query.search;
    let isSearch = req.query.isSearch;
    

    let fullUrl = isSearch=='true' ? (url+searchPre+search+api) : categoryName==='All' ? (url+country+countryCode+api) : (url+country+countryCode+category+categoryName+api) ;
    
    axios.get(fullUrl)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(fullUrl);
    });

    
})

app.get('/location', (req,res) =>{

  const prefex='https://extreme-ip-lookup.com/json/?key=';
  const api = process.env.REACT_APP_IPLOOKUP_API_KEY
  const fullUrl = prefex+api;
  console.log('LOOKUP',fullUrl)

  axios.get(fullUrl)
    .then(response => {
      res.json(response.data);
      console.log('DATA:',response.data)
    })
    .catch(error => {
      console.log(fullUrl);
    });
  


})

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});