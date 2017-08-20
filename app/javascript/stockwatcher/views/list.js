import Marionette from 'backbone.marionette';
import StockItemTemplate from '../templates/stockitem.html';

//this is our stock item
class Stock extends Marionette.LayoutView {
  constructor(options) {
    options.template = StockItemTemplate;
    options.tagName = 'article';
    options.className = 'fu-stock-item';
    super(options);
  }
}
export default class ListView extends Marionette.CollectionView {
  constructor(options) {
    options.tagName = 'div';
    options.className = 'fu-stocks';
    options.childView = Stock
    super(options);
  }
}
