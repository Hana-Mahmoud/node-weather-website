const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        forecast: 'It is snowing',
        location: 'Philadelphia',
        title:'Home',
        name: 'Hana'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Hana'
    })
})

app.get('/about/*',(req, res)=>{
    res.render('404',{
        title: '404 ERROR',
        name: 'Hana',
        errorMessage: 'About article is not found'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address) {
       return res.send({error: 'you must provide an address'})
    }


geoCode(req.query.address, (error,{latitude,longitude,location}= {})=>{
    if(error){
        return res.send({error});
    }
    forecast(latitude,longitude, (error, forecastData) => {
        if(error){
          return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
      })
  })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404 ERROR',
        name: 'Hana',
        errorMessage: 'page is not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});
