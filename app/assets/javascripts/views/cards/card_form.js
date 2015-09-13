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
    this.model.set({ list_id: listId })
    this.model.save(formData.card,{
      success: function(card){
        this.list.add(card)
        this.model = new TrelloClone.Models.Card();
      }.bind(this)
    });

  }
});
