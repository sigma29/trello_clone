TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  comparator: 'ord',

  initialize: function(options) {
    this.list = options.list;
  },

  getOrFetch: function(id) {
    var card= this.get(id);
    var collection = this;

    if (card) {
      card.fetch({
        success: function(){
        }
      });
    } else {
      card = new TrelloClone.Models.Card({ id: id });
      collection.add(card);

      card.fetch({
        error: function(){ collection.remove(card);},
        success: function(){

        }
      });
    }

    return card;
  }
})
