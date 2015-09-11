TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': "index",
    'boards/new' : "new",
    'boards/:id/lists/new' : 'new_list',
    'boards/:id' : 'show',

  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // this.boards = options.boards;
  },

  index: function(){
    var indexView = new TrelloClone.Views.BoardIndex();
    //var indexView = new TrelloClone.Views.BoardIndex({collection: this.boards});
    this._swapView(indexView);
  },

  new: function(){
    var newBoard = new TrelloClone.Models.Board();
    var formView = new TrelloClone.Views.BoardForm({
      model: newBoard //, collection: this.boards
    })
    this._swapView(formView);
  },

  show: function(id) {
    var board = TrelloClone.Boards.getOrFetch(id);
    console.log(board);
    var boardView = new TrelloClone.Views.BoardShow({
      model: board //,
      //collection: this.boards
    });
    this._swapView(boardView);
  },

  new_list: function(id) {
    var board = TrelloClone.Boards.getOrFetch(id);
    var listFormView = new TrelloClone.Views.ListForm({ board: board});
    this._swapView(listFormView)
  },

  _swapView: function(view){
    this._current_view && this._current_view.remove();
    this._current_view = view;
    this.$rootEl.html(this._current_view.render().$el);
  }
});
