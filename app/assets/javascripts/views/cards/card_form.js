TrelloClone.Views.CardForm = Backbone.View.extend({
  template: JST['cards/card_form'],
  tagName: 'form',
  className: 'new-card-form',

  events:{
    "click button.new-card": "submitCard"
  },

  initialize: function(options) {
    this.list = options.list;
    if (!this.model) {
      this.model = new TrelloClone.Models.Card();
    }
  },

  render: function() {
    this.$el.html(this.template({card: this.model }));

    return this;
  },

  submitCard: function(e) {
    var formData = this.$el.serializeJSON();
    var listId = this.list.id;
    var numCards = this.list.cards().length

    this.model.set({ list_id: listId, ord: numCards + 1 });

    if (!formData.card.title) {
      this.$('input[type="text"]').toggle("highlight",{color: 'red'},2000);
      setTimeout(function(){
          this.$('input[type="text"]').toggle("highlight",{color: 'white'});
      }.bind(this), 0);
    }
    this.model.save(formData.card,{
      success: function(card){
        this.list.cards().add(card)
        this.model = new TrelloClone.Models.Card();
      }.bind(this)
    });
  },


});
