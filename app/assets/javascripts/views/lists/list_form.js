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
      this.board = options.board;
    }
  },

  render: function() {
    this.$el.html(this.template({ list: this.model }));
    return this;
  },

  submitList: function(e) {
    e.preventDefault();
    formData = this.$el.serializeJSON();
    var numLists = this.board.lists().length

    this.model.set({ board_id: this.board.id, ord: numLists + 1 });
    this.$el[0].reset();

    if (!formData.list.title) {
      this.$('input[type="text"]').toggle("highlight",{color: 'red'},2000);
      setTimeout(function(){
          this.$('input[type="text"]').toggle("highlight",{color: 'white'});
      }.bind(this), 0);

    } else {
      this.model.save(formData.list,{
        success: function(list){
          this.board.lists().add(list);
        }.bind(this)
      });
      this.model = new TrelloClone.Models.List();
    }

  }
});
