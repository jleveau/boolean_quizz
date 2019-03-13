const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const http = require('http')
const ResultManager = require('./results/result')
const mongoose = require('mongoose')
const config = require('../config')
const morgan = require('morgan')
const bodyParser = require('body-parser');
http.Server(app);

const connectWithRetry = function () {
    return mongoose.connect(config.mongo, { useNewUrlParser: true })
        .then(() => {
            console.log("Connecting to database : " + config.mongo)
        })
        .catch((err) => {
            if (err) {
                console.error(err)
                setTimeout(connectWithRetry, 5000)
            }
        })
}

connectWithRetry()

app.use(morgan("common"));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static(path.join(__dirname, '..', '..', 'front', 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'front', 'build', 'index.html'));
});

app.post('/result', async function(req, res) {

    if (req.body && req.body.result) {
        try {
            await ResultManager.register(req.body.result)
            res.send(200)
        } catch(e) {
            res.status(500).send('Failed to register Results')
        }
    } else {
        res.status(500).send("Invalid body format")
    }
})
app.get('/result', async function(req, res) {
    try {
        const data = await ResultManager.getAll()
        res.json(data)
    } catch(e) {
        res.status(500).send('Failed to retreive data')
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

