TrelloClone.Views.CardListItem = Backbone.CompositeView.extend({
  template: JST['cards/card_list_item'],

  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click button.update-card": "updateCard",
    "click button.delete-card": "removeCard"
  },

  initialize: function(options){
    this.list = options.list;
  },

  render: function() {
    this.$el.data("id", this.model.id);
    debugger
    this.$el.html(this.template({ card: this.model }));

    return this;
  },

  updateCard: function(event){
    var list = this.list;
    var updateForm = new TrelloClone.Views.CardForm({
      model: this.model,
      list: list
    });
    this.addSubview("div.update-card",updateForm);
  },

  removeCard: function(event) {
    var list = this.list;
    var card = this.model;
    this.model.destroy({
      success: function(){
        list.cards().remove(card);
      }
    });

  }
});
