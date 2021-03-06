TrelloClone.Views.ListListItem = Backbone.CompositeView.extend({
  template: JST['lists/list_list_item'],
  tagName: 'li',

  events: {
    "click button.remove-list":"removeList"
  },

  initialize: function(options){
    this.board = options.board;
    this.cards = this.model.cards();
    this.listenTo(this.cards, "add", this.addCardSubview);
    this.listenTo (this.cards, "remove", this.removeCardSubview)
    this.listenTo(this.cards, "sync add",this.render);
    this.listenTo(this.model, "sync", this.render);

    var cardForm = new TrelloClone.Views.CardForm({list: this.model});
    this.model.cards().each(function(card) {
      this.addCardSubview(card);
    }.bind(this));
    this.addSubview("p.add-card",cardForm);
  },

  render: function() {
    this.$el.attr("data-id", this.model.id);
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();
    return this;
  },

  removeList: function() {
    this.model.destroy();
  },

  addCardSubview: function(card) {
    var cardView = new TrelloClone.Views.CardListItem({
      model: card,
      list: this.model
    });
    this.addSubview("ul.list-cards",cardView)
  },

  removeCardSubview: function(card) {
    this.removeModelSubview("ul.list-cards",card);
    this.render();
  }
});
