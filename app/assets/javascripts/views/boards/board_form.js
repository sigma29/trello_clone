TrelloClone.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/board_form'],

  tagName: 'form',

  events: {
    "click button.board-submit": "submit"
  },

  render: function() {
    if (!this.model) {
      this.model = new TrelloClone.Models.Board();
    }
    var content = this.template({board: this.model});
    this.$el.html(content);

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var view = this;
    var formData = this.$el.serializeJSON();
    if (!this.collection) {
      this.collection = new TrelloClone.Collections.Boards();
      this.collection.fetch();
    }
    this.model.save(formData, {
      success: function(board){
        view.collection.add(board);
        Backbone.history.navigate("#/boards/" + board.id, {trigger:true })
      }
    });
  }
});
