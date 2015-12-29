This contains the API service built and deployed to Heroku for Angular 2 in Action.

## APIs

### `/stocks/snapshot?symbols=aapl,goog,fb`

This API returns a snapshot of the stocks passed as a symbol parameter. It uses Yahoo! Finance to lookup the snapshot data.

### `/stocks/historical/{symbol}`

This API looks up an individual stock's historical data based on the symbol in the path. It uses Yahoo! Finance to lookup the historical data.
