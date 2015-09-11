window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.Boards = new TrelloClone.Collections.Boards();
    TrelloClone.Boards.fetch();
    new TrelloClone.Routers.Router({$rootEl: $('div#main')})
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
