/*
  To create a cooldown task:
  - Create a Custom Task

  - Add one of ${SB$COOLDOWNS} tags into Custom Task Tags eg. "minute"

  - Set Quest to be repeatable

  - Set as Team Reward as necessary
*/

/*
  Formatting to add a new cooldown tag variant:
  ${tag} : {
    [required] max_progress: ${time represented in milliseconds},
    [optional] unit_divider: ${time to be divided by to present as progress},
    [optional] unit_representation: ${string of represented time}
  }
*/

let SB4$COOLDOWNS = {};

SB4$COOLDOWNS["milliseconds"] = [1,1]
SB4$COOLDOWNS["game_tick"]    = [SB4$COOLDOWNS["milliseconds"][1],  SB4$COOLDOWNS["milliseconds"][1]  * 50]
SB4$COOLDOWNS["seconds"]      = [SB4$COOLDOWNS["milliseconds"][1],  SB4$COOLDOWNS["milliseconds"][1]  * 1000]
SB4$COOLDOWNS["minutes"]      = [SB4$COOLDOWNS["seconds"][1],       SB4$COOLDOWNS["seconds"][1]       * 60]
SB4$COOLDOWNS["hourly"]       = [SB4$COOLDOWNS["minutes"][1],       SB4$COOLDOWNS["minutes"][1]       * 60]
SB4$COOLDOWNS["daily"]        = [SB4$COOLDOWNS["hourly"][1],        SB4$COOLDOWNS["hourly"][1]        * 24]
SB4$COOLDOWNS["weekly"]       = [SB4$COOLDOWNS["daily"][1],         SB4$COOLDOWNS["daily"][1]         * 7]
SB4$COOLDOWNS["monthly"]      = [SB4$COOLDOWNS["daily"][1],         SB4$COOLDOWNS["daily"][1]         * 30]


FTBQuestsEvents.customTask((event) => {
  const { task: { id, tags, title, quest } } = event
  let task = event.getTask();

  let quest_tag = Object.keys(SB4$COOLDOWNS).find(tag => tags.contains(tag))
  if (quest_tag) {

    // Unpack the first available tag
    let { 0: divisor, 1: value} = SB4$COOLDOWNS[quest_tag]
    
    let max_progress = value

    event.setEnableButton(true)

    // Change to check every 20 ticks instead of every tick
    event.setCheckTimer(20)

    // Set progress to Millisecond / Unit representation
    max_progress = Math.floor(value / divisor);
    event.setMaxProgress(max_progress)

    event.setCheck((data, player) => {
      // Task already complete return early
      if (data.getProgress() >= max_progress) return;

      // Team data should always exist
      let teamsData = Teams.getData(player);
      if (!teamsData) {
        throw new Error("Sb4Cooldown: Teams Data is null, it should never be null, please report this to FTB")
      }

      // If cooldown does not exist, create a new one for the quest
      let timer = Teams.getDataValue(player, `quest_${quest.id}_cooldown`);
      if (!timer) {
        Teams.setData(player, `quest_${quest.id}_cooldown`, 0);
      }

      // Retrieve current timer or the newly created one
      timer = Teams.getDataValue(player, `quest_${quest.id}_cooldown`).getAsLong();

      // Calculate progress, values range from ${-MaxProgress} to ${CurrentTime},
      // 0 or greater indicates as complete
      let current_time = Utils.getSystemTime()
      let current_progress = Math.floor((current_time - timer) / divisor);
      

      // Don't set progress if progress is above max progress
      // Fixes players getting double reward if they've been gone 2x MaxProgress
      // If Timer is 0, it means it was just created and will auto complete
      if (timer == 0) {
        data.setProgress(max_progress);
      } 
      if ((current_time - timer) > value || timer == 0) {
        Teams.setData(player, `quest_${quest.id}_cooldown`, current_time);
      } else if ((current_time - timer) <= value) {
        data.setProgress(current_progress);
      }
    })
  }
});