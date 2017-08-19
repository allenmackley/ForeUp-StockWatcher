import $ from 'jquery'
import Marionette from 'backbone.marionette';
import FormView from './form';
import ListView from './list';
import LayoutTemplate from '../templates/layout.html';

export default class StockView extends Marionette.LayoutView {
  constructor(options) {
    options.template = LayoutTemplate;
    options.el = 'body';
    options.regions = {
      form: '.fu-stock-form-cont',
      list: '.fu-stocks-cont'
    };
    super(options);
  }
  ui() {
    return {
      none: '.fu-stock-none'
    }
  }
  onRender() {
    // console.log('on render');
    //hide text that says "No stock yet!"
    if (this.collection.length) {
      this.ui.none.hide();
    }
    const formView = new FormView({model: this.model});
    const listView = new ListView({collection: this.collection});
    this.showChildView('form', formView);
    this.showChildView('list', listView);
  }
  collectionEvents() {
    return { add: 'itemAdded' };
  }
  onChildviewAddStockItem(child) {
    const symbol = child.ui.symbol.val();
    const url = `https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'${symbol}'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

    $.getJSON(url, (data) => {
      let trend;
      if (!data) {
        alert("Could not retrieve stock data.")
        return
      } else if (!data.query.results) {
        alert("Enter a four character stock symbol and try again.")
        return
      }
      const
        quote    = data.query.results.quote,
        price    = parseFloat(quote.LastTradePriceOnly, 10),
        change   = parseFloat(quote.Change, 10),
        perc     = ((change / price) * 100).toFixed(2),
        high     = parseFloat(quote.DaysHigh, 10),
        low      = parseFloat(quote.DaysLow, 10),
        dayDiff  = high - low,
        curDiff  = high - price,
        range    = (curDiff / dayDiff) * 100;

      if ( parseFloat(quote.Change) > 0 ) {
        trend = 'fu-stock-up';
      } else {
        trend = 'fu-stock-down';
      }
      //set the model so that we can verify the data on it.
      this.model.set({
        name: quote.Name,
        symbol: quote.symbol,
        change: quote.Change,
        perc: perc,
        price: quote.LastTradePriceOnly,
        high: quote.DaysHigh,
        low: quote.DaysLow,
        trend: trend,
        range: range
      });
      //check validitiy
      if (this.model.isValid()) {
        const items = this.model.pick('name', 'symbol', 'change', 'perc', 'price', 'high', 'low', 'trend', 'range');
        //add new stock item
        this.collection.add(items);
      }
      //focus it again so we can easily add another stock
      child.ui.symbol.focus()
    })
  }
  itemAdded() {
    this.ui.none.hide();
    this.model.set({
      name: '',
      symbol: '',
      change: '',
      perc: '',
      price: '',
      high: '',
      low: '',
      trend: '',
      range: ''
    });
  }
}
