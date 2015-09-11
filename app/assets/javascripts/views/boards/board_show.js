TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/board_show'],

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
    this.addSubview("p.new-list",formView)
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
  }
});
