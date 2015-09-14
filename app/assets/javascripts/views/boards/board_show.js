TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board_show'],

  events:{
    "click button.remove-board":"addModalSubview",
    "click button.cancel-button":"removeModalSubview"
  },

  initialize: function(){
    if (!this.collection) {
      this.collection = new TrelloClone.Collections.Boards();
    }
    this.lists = this.model.lists();
    this.listenTo(this.lists, "add", this.addListSubview);
    this.listenTo(this.lists, "remove", this.removeListSubView);
    this.listenTo(this.lists, "sync add", this.render);
    this.listenTo(this.model, "sync", this.render);
    this.model.lists().each(function(list) {
      this.addListSubview(list);
    }.bind(this));
    var formView = new TrelloClone.Views.ListForm({ board: this.model });
    this.addSubview("div.new-list",formView)
  },

  render: function() {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    return this;
  },

  addListSubview: function(list) {
    var listView = new TrelloClone.Views.ListListItem({
      model: list,
      board: this.model
    });
    this.addSubview("ul.list-list-items",listView);
  },

  removeListSubView: function(list) {
    this.removeModelSubview("ul.list-list-items",list);
    this.render();
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
    this.removeModelSubview("div.modals",this.model)
    this.removeModelSubview("div.modals",this.model)
  }
});
