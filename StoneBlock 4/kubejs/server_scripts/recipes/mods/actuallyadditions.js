ServerEvents.recipes((event) => {
    
    //Adding a method to obtain AA's Coffee Beans.
    event.custom({
        "type": "actuallyadditions:laser",
        "energy": 8000,
        "ingredient": {
          "tag": "c:crops/cocoa_bean"
        },
        "result": {
          "id": "actuallyadditions:coffee_beans"
        }
    }).id("ftb:actuallyadditions/laser/coffee_beans")
  
});
  