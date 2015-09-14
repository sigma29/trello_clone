TrelloClone.Views.BoardListItem = Backbone.CompositeView.extend({
  template: JST['boards/board_index_item'],
  tagName: 'li',

  events: {
    "click button.remove-board": "addModalSubview",
    "click button.cancel-button":"removeModalSubview"
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
  },

  addModalSubview: function(){

    var largeModal = new TrelloClone.Views.LargeModal({ model: this.model });
    var confirmModal = new TrelloClone.Views.ConfirmModal({ model: this.model });
    this.addSubview("div.modals",largeModal);
    this.addSubview("div.modals",confirmModal);

    this.render
  },

  removeModalSubview: function(event){
    //twice, once for the background and once for the central pop-up
    this.removeModelSubview("div.modals",this.model);
    this.removeModelSubview("div.modals",this.model);
  }
})
