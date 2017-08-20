import Marionette from 'backbone.marionette';
import FormTemplate from '../templates/form.html';

export default class FormView extends Marionette.LayoutView {
  constructor(options) {
    options.template = FormTemplate;
    options.tagName = 'form';
    options.className = 'fu-stock-form';
    super(options);
  }
  triggers() {
    return {
      submit: 'add:stock:item'
    };
  }
  modelEvents() {
    return {
      change: 'render'
    };
  }
  ui() {
    return {
      symbol: '.fu-stock-symbol-field'
    };
  }
}
