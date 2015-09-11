TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',

  model: TrelloClone.Models.Board,

  getOrFetch: function(id) {
    var board = this.get(id);
    var collection = this;

    if (board) {
      board.fetch({
        success: function(){
        }
      });
    } else {
      board = new TrelloClone.Models.Board({ id: id });
      collection.add(board);

      board.fetch({
        error: function(){ collection.remove(board);},
        success: function(){

        }
      });
    }

    return board;
  }
});
