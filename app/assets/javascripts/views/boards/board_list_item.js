TrelloClone.Views.BoardListItem = Backbone.View.extend({
  template: JST['boards/board_index_item'],
  tagName: 'li',

  events: {
    "click button.remove-board": "removeBoard"
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);

    return this;
  },

  removeBoard: function(event){
    this.model.destroy({
      success: function() {
        TrelloClone.Boards.remove(this.model);
      }.bind(this)
    });
  }
})
