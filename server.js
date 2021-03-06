import { coinFlip,coinFlips,countFlips,flipACoin } from "./modules/coin.mjs";

import minimist from 'minimist';
import express from 'express';

const app = express()

var argv = minimist(process.argv.slice(2))
var allowedName = 'port'
const HTTP_PORT = argv[allowedName] || 5000

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
})

//Check status code endpoint
app.get('/app/', (req,res) => {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' + res.statusMessage)
});
//Endpoint that returns JSON of flip function result
app.get('/app/flip/', (req,res) => {
    res.statusCode = 200;
    let flip = coinFlip()
    res.json({flip: flip})
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json' });
})
//Endpoint that returns JSON of flip array (num) & summary
app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    var number = req.params.number;
    let raw = coinFlips(number)
    let summary = countFlips(raw)
    res.json({ raw: raw, summary: summary})
    //res.json(summary)
    res.writeHead(res.statusCode, {'Content-Type' : 'application/json' });
    
    
})
//Endpoint that returns the result of calling heads
app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('heads')
    res.send(result)
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain' });
})
//Endpoint that returns the result of calling tails
app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let result = flipACoin('tails')
    res.send(result)
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain' });
})

app.use(function(req,res){
    res.status(404).send('404 NOT FOUND')
})