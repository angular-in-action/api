This contains the API service for Angular 2 in Action. This is just a sample service, it no longer uses real live data since that adds a lot of complexity to setup and run.

You will need to run this locally to get some of the examples to work from the book. It is pretty simple as long as you have a recent version of Node installed. 

```
git clone https://github.com/angular-in-action/api.git
cd api
npm install
node index.js
```

## APIs

### `/stocks/snapshot?symbols=aapl,goog,fb`

This API returns a snapshot of the stocks passed as a symbol parameter. It uses Yahoo! Finance to lookup the snapshot data.

### `/stocks/historical/{symbol}`

This API looks up an individual stock's historical data based on the symbol in the path. It uses Yahoo! Finance to lookup the historical data.
