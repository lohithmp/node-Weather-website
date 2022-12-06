/*
Importing Node.js Core Modules.
    require function is used to load in a module and get access to its contents.
*/
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
/* call to path.join allows to manipulate a path by providing individual path segments */
const publicDirectorypath =path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

const app = express()

// Setup handlebars engine and views location
/* Call app.set to set a value for the 'views' option */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
/*  use partials by telling Handlebars where you’d like to store them by calling hbs.registerPartials*/
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectorypath))

/* app.get to set up a handler for an HTTP GET request 
    The first argument is the path to set up the handler for. 
    The second argument is the function to run when that path is visited
*/
app.get('',(req,res) => {
    res.render('index',{
     title:"Weather",
     text: "Enter the location to get weather!",
     name: "Lohith M P"
    })
 })

app.get('/help',(req,res) =>{
    res.render('help',{
        title:"Help",
        helpText: "How can we help you?",
        name: "Lohith M P"
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: "About Me",
        name: "Lohith M P"
    })
})

app.get("/help/*",(req,res) =>{
    res.render('404',{
        title:404,
        errorMessage:" Help article not found."
    })
})

/* app.get to set up a handler for an HTTP GET request 
    The first argument is the path to set up the handler for. 
    The second argument is the function to run when that path is visited
*/
/* Calling res.send in the route handler allows to send back a
    message as the response.
 */
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address term"
        })   
    }
    // Destructuring Implemented
    /*
    To use the output from geocoding as the input for fetching the weather.
    The handler below uses req.query.address to get the value provided for address  by access the query string key value pairs.
    */
    geocode(req.query.address, (error, {latitude ,longitude ,location } = {}) =>{
        if(error){
            return res.send({ error })
        }else{
        forecast(latitude,longitude,(error, {place}) =>{
            if(error){
                return res.send({
                    error
                })
            }else{
                return res.send({
                   forecast:place,
                   location,
                   address:req.query.address
                })            
            }
        })
    }
    })
})

app.get("*",(req,res) =>{
    res.render('404',{
        title:404,
        errorMessage:" Page not found."
    })
})

/* calling app.listen with the port 3000 want to listen on*/
app.listen(3000,() =>{
    console.log("server is up on port "+3000)
})