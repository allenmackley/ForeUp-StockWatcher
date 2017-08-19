/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
$ = require('jquery')

const Backbone   = require('backbone');
const Marionette = require('backbone.marionette');
//this is our stock item
const Stock = Marionette.LayoutView.extend({
  tagName: 'li',
  className: 'fu-stock-item',
  template: require('./templates/stockitem.html')
});
//this is our form and stock list, composited into one view template
const StockList = Marionette.CompositeView.extend({
  el: 'body',
  template: require('./templates/stocklist.html'),
  childView: Stock,
  childViewContainer: '.fu-stocks',
  ui: {
    form: '.fu-stock-form',
    symbol: '.fu-stock-symbol-field',
    none: '.fu-stock-none'
  },
  triggers: {
    'submit @ui.form': 'add:stock:item'
  },
  collectionEvents: {
    add: 'itemAdded'
  },
  onAddStockItem() {
    const symbol = this.ui.symbol.val()
    const url = `https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'${symbol}'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`

    $.getJSON(url, (data) => {
      const quote = data.query.results.quote
      const perc  = ((parseFloat(quote.Change, 10) / parseFloat(quote.LastTradePriceOnly, 10)) * 100).toFixed(2)
      if ( !quote.Name ) {
        alert("Couldn't find stock. Please try another symbol.")
        this.ui.symbol.val('').focus()
        return
      }
      //hide text that says "No stock yet!"
      this.ui.none.hide()
      //add new stock item
      this.collection.add({
        name: quote.Name,
        symbol: quote.symbol,
        change: quote.Change,
        perc: perc,
        price: quote.LastTradePriceOnly,
        high: quote.YearHigh,
        low: quote.YearLow
      });
    })
  },
  itemAdded() {
    //clear the text input form and focus it for typing another symbol
    this.ui.symbol.val('')
    this.ui.symbol.focus()
  }
});

const stock = new StockList({
  //if we had initial stock items to render, they would go here
  collection: new Backbone.Collection([])
});
//render the form and stock list container
stock.render()
