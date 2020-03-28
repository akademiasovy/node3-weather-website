const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const port  = process.env.PORT || 3000

const publicDirectory =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Rolo',
        weatherText: ' Use this site to get your weather!'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is help Text',
        title: 'Help',
        name:'Rolo'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        aboutText:'This is About Text',
        title: 'About',
        name: 'Rolo'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
             return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
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
    /*res.render('index',{
        aboutText:'This is About Text',
        title: 'About',
        name: 'Rolo'
    })*/
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({error:'You must provide a search term'})
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{ 
        errorMessage:'Help article not found',
        title:'404',
        name:'Rolo'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found',
        title:'404',
        name:'Rolo'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})