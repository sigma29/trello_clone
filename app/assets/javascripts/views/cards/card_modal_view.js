TrelloClone.Views.CardModal = Backbone.CompositeView.extend({
  template: JST['cards/card_modal'],

  render: function(){
    var content = this.template({ card: this.model });
    this.$el.html(content);

    return this;
  }
});
