# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :id, :title, :user_id)

json.lists @board.lists do |list|
   json.(list, :id, :title, :ord)
   json.cards list.cards do |card|
     json.(card, :id, :title, :description, :ord)
     json.items card.items do |item|
          json.(item, :id, :title, :done, :card_id)
     end
   end
end
