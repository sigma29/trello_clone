TrelloClone.Views.CardListItem = Backbone.CompositeView.extend({
  template: JST['cards/card_list_item'],

  tagName: 'li',

  render: function() {
    this.$el.html(this.template({ card: this.model }));

    return this;
  }
});
