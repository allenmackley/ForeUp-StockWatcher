import $ from 'jquery'
import Backbone from 'backbone';

export default class StockModel extends Backbone.Model {
  defaults() {
    return {
      name: '',
      symbol: '',
      change: '',
      perc: '',
      price: '',
      high: '',
      low: '',
      trend: '',
      range: ''
    };
  }
  validate(attrs) {
    const errors = {};
    let hasError = false;

    if (!attrs.name) {
      errors.assignee = 'name must be set';
      hasError = true;
    }
    if (!attrs.symbol) {
      errors.text = 'symbol must be set';
      hasError = true;
    }
    if (!attrs.change) {
      errors.text = 'change must be set';
      hasError = true;
    }
    if (!attrs.perc) {
      errors.text = 'perc must be set';
      hasError = true;
    }
    if (!attrs.price) {
      errors.text = 'price must be set';
      hasError = true;
    }
    if (!attrs.high) {
      errors.text = 'high must be set';
      hasError = true;
    }
    if (!attrs.low) {
      errors.text = 'low must be set';
      hasError = true;
    }
    if (!attrs.trend) {
      errors.text = 'trend must be set';
      hasError = true;
    }

    if (hasError) {
      alert("Couldn't find stock. Please try another symbol.")
      return errors;
    }
  }
  confirmData(data) {
    if (!data) {
      alert("Could not retrieve stock data.")
      return false;
    } else if (!data.query.results) {
      alert("Enter a four character stock symbol and try again.")
      return false;
    }
    return true;
  }
  parseData(data) {
    let trend;
    const
      quote    = data.query.results.quote,
      price    = parseFloat(quote.LastTradePriceOnly, 10),
      change   = parseFloat(quote.Change, 10),
      perc     = ((change / price) * 100).toFixed(2),
      high     = parseFloat(quote.DaysHigh, 10),
      low      = parseFloat(quote.DaysLow, 10),
      dayDiff  = high - low,
      curDiff  = high - price,
      range    = (curDiff / dayDiff) * 100,
      { symbol, Name: name } = quote;

    if ( parseFloat(quote.Change) > 0 ) {
      trend = 'fu-stock-up';
    } else {
      trend = 'fu-stock-down';
    }
    //set the model so that we can verify the data on it.
    return {name, symbol, change, price, high, low, perc, trend, range};
  }
  buildQueryString(symbol) {
    return `https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'${symbol}'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
  }
  queryYahoo(symbol) {
    const url = this.buildQueryString(symbol);
    return $.getJSON(url, (data) => {
      if ( this.confirmData(data) ) {
        this.set( this.parseData(data) );
      }
    });
  }
}
