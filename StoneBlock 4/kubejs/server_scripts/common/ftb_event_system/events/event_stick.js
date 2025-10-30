// priority: 800
const event_stick = {
  name: "ftb:stick",
  description: "Gives the player a stick with a funny name",
  displayName: "Stick Event",
  chance: 0.2,
  names: 21,
  execute(event, player, location) {
    player.tell(Text.translate("ftb.event.stick.text"));
    let chosenName = `ftb.event_system.stick.name_${Math.floor(Math.random() * this.names) + 1}`;
    let item = Item.of(`stick[item_name='{"translate":"${chosenName}"}']`);
    player.give(item);  
    
  },
};
