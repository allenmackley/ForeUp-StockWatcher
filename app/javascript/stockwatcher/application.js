import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import StockView from './views/layout';
import StockModel from './models/stock';

const initialData = [];
/*
{
  name: "Alphabet Inc.",
  symbol: "GOOG",
  change: "-0.31",
  perc: "-0.03",
  price: "910.67",
  high: "988.25",
  low: "727.54",
  trend: 'fu-stock-down',
  range: 50
}
*/

export class StockApp extends Marionette.Application {
  onStart(options) {
    const stock_view = new StockView({
      collection: new Backbone.Collection(options.initialData),
      model: new StockModel()
    });
    stock_view.render();
  }
}

window.app = new StockApp
window.app.start({initialData: initialData});
