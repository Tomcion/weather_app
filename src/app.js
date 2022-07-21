const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Tymon'
    }); });

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tymon'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tymon',
        info: 'Help page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address specified"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error });

        weather({ latitude, longitude }, (error, forecast) => {
            if (error)
                return res.send({ error });
            
            res.send({
                forecast,
                location
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help page not found',
        name: 'Tymon'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 not found',
        name: 'Tymon'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
