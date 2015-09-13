TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST['lists/list_form'],
  tagName: 'form',
  className: 'new-list-form',

  events: {
    "click button.submit" : "submitList"
  },

  initialize: function(options) {
    if (!this.model) {
      this.model = new TrelloClone.Models.List();
    }
    if (options.board) {
      this.model.set({board_id: options.board.id});
    }
  },

  render: function() {
    this.$el.html(this.template({ list: this.model }));
    return this;
  },

  submitList: function(e) {
    e.preventDefault();
    formData = this.$el.serializeJSON();
    this.$el[0].reset();
    this.model.save(formData.list,{
      success: function(){
        var boardId = this.model.get("board_id");
        var board = TrelloClone.Boards.get(boardId);
        board.lists().add(this.model);
        this.model = new TrelloClone.Models.List();
      }.bind(this)
    });

  }
});
