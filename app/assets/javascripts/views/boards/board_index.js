TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['boards/board_index'],

  events: {
    "click button.new-board": "displayBoardForm"
  },

  initialize: function(){
    this.collection = TrelloClone.Boards;
    this.listenTo(this.collection, "remove", this.removeBoardSubView)
    this.listenTo(this.collection, "sync add", this.render);
    this.listenTo(this.collection, "add", this.addBoardSubview)

    this.collection.each(function(board) {
      this.addBoardSubview(board);
    }.bind(this));
    var boardForm = new TrelloClone.Views.BoardForm();
    this.addSubview("div.board-form",boardForm);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addBoardSubview: function(board) {
    var boardListItem = new TrelloClone.Views.BoardListItem({model: board});
    this.addSubview("ul.board-index",boardListItem);
  },

  removeBoardSubView: function(board) {
    this.removeModelSubview("ul.board-index",board);

    this.render();
  },

  displayBoardForm: function() {
    this.$('div.board-form').addClass("show");
  }
});
