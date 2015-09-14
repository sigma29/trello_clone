TrelloClone.Views.ConfirmModal = Backbone.View.extend({

  template: JST['modals/confirm_modal'],
  className: 'confirm-modal',

  events: {
    "click .delete-button":'deleteBoard'
  },

  deleteBoard: function() {
    this.model.destroy();
    Backbone.history.navigate('',{trigger: true})
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }

});
