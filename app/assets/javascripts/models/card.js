TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: '/api/cards',

  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);

    return { "card": json };
  },

  items: function(){
    if (!this._items) {
      this._items = new TrelloClone.Collections.Items([],{ card: this.model });
    }

    return this._items
  },

  parse: function(response){
    if (response.items){
      this.items().set(response.items,{parse: true})
    }

    return response;
  }
});
