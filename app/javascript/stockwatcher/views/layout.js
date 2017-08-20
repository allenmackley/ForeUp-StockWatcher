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

    this.model.queryYahoo(symbol).done(() => {
      //check validitiy
      if (this.model.isValid()) {
        const items = this.model.pick('name', 'symbol', 'change', 'perc', 'price', 'high', 'low', 'trend', 'range');
        //add new stock item
        this.collection.add(items);
      }
      //focus it again so we can easily add another stock
      child.ui.symbol.focus()
    });
  }
  itemAdded() {
    this.ui.none.hide();
    //will clear the form field and call render on the model
    this.model.set({
      symbol: ''
    });
  }
}
