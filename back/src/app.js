const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const http = require('http')
const ResultManager = require('./results/result')
const mongoose = require('mongoose')
const config = require('../test/config')
http.Server(app);

async function init() {
    try {
        await mongoose.connect(config.mongo, { useNewUrlParser: true })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
    app.use(express.static(path.join(__dirname, '..','front', 'build')));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '..','front', 'build', 'index.html'));
    });

    app.post('/results', async function(req, res) {
        if (req.body && req.body.results) {
            try {
                await ResultManager.register(req.body.results)
                res.send(200)
            } catch(e) {
                res.status(500).send('Failed to register the results')
            }
        }
    })
    await app.listen(port, () => console.log(`Listening on port ${port}`));
}

init()


