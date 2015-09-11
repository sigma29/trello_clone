TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  comparator: 'ord',

  initialize: function(options) {
    this.list = options.list;
  }
})
