'use strict';

var cors = require('cors');
var express = require('express');

var app = express();
var stocks = require('./stocks.json');

// Enable CORS
app.use(cors());

app.set('port', (process.env.PORT || 3000));

function getRandomInt(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

// Endpoint to load snapshot data from yahoo finance
app.get('/stocks/snapshot', function(req, res) {
  if (req.query.symbols) {
    var symbols = req.query.symbols.split(',');
    symbols.map(function(symbol) {
      return symbol.toUpperCase();
    });

    const items = stocks.filter(stock => symbols.indexOf(stock.symbol) > -1);

    // Add any new items someone might add
    const missing = symbols.filter(symbol => !stocks.find(stock => stock.symbol === symbol));
    missing.forEach(symbol => {
      const lastTradePriceOnly = getRandomInt(0, 100);
      const change = getRandomInt(0, 2);
      const changeInPercent = change / lastTradePriceOnly;
      stocks.push({symbol, lastTradePriceOnly, change, changeInPercent});
    });

    res.status(200).send(items);

  } else {
    res.status(400).send({message: `The request requires at least one symbol. Try adding '?symbols=appl' to the request.`});
  }
});

// Endpoint to load historical data from yahoo finance.
app.get('/stocks/historical/:symbol', function(req, res) {
  var today = new Date();
  var yearAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 365);
  yahooFinance.historical({
    symbol: req.params.symbol,
    from: yearAgo.toString(),
    to: today.toString()
  }, function(err, quotes) {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(quotes);
  });
});

app.get('/', function(req, res) {
  res.status(200).contentType('text/html').send(`Welcome to the Angular in Action API. See <a href='https://github.com/angular-in-action/api#readme'>https://github.com/angular-in-action/api#readme</a> for details.`);
});

app.listen(app.get('port'), function() {
  console.log('App is running on port ', app.get('port'));
});

// Every 10 seconds, change data values
setInterval(() => {
  let start = Date.now();
  let changes = [0, 0, 0, 1, 1, 1, 1, 1, -1 -1 -1 -1 -1, 2, 2, 2, -2, -2, -2, 3, -3, 4, -4];
  stocks = stocks
    .map(stock => {
      let index = getRandomInt(0, changes.length - 1);
      let change = changes[index];
      if (stock.lastTradePriceOnly > 1000) {
        change = -1;
      }
      if (stock.lastTradePriceOnly <= 1) {
        change = 1;
      }
      // Force it to be 2 decimals, cuz in JS floating point math can be lolz
      stock.change = parseInt((stock.change * 100) + change) / 100;
      stock.changeInPercent = parseInt((stock.changeInPercent * 100) + change) / 100; 
      stock.changeInPercent = parseInt((stock.change * 100) / (stock.lastTradePriceOnly * 100) * 10000) / 10000;
      return stock;
    });

  console.log('new stocks %s ms', Date.now() - start);

}, 10000);
