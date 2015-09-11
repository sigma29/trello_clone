TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: '/api/cards',

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);

    return { "card": json };
  }
});
