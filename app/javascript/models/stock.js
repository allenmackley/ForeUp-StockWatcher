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
      low: ''
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

    if (hasError) {
      alert("Couldn't find stock. Please try another symbol.")
      return errors;
    }
  }
}
