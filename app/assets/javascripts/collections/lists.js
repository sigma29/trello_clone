TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,

  comparator: 'ord',

  initialize: function(options) {
    this.board = options.board;
  },

  getOrFetch: function(id) {
    var list = this.get(id);
    var collection = this;

    if (list) {
      list.fetch({
        success: function(){
        }
      });
    } else {
      list = new TrelloClone.Models.List({ id: id });
      collection.add(list);

      list.fetch({
        error: function(){ collection.remove(list);},
        success: function(){

        }
      });
    }

    return list;
  }
});
