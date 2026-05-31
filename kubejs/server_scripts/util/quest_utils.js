//priority: 1000
const $ProgressChange = Java.loadClass("dev.ftb.mods.ftbquests.util.ProgressChange");

//For accessing quest stuff outside of the custom task event

let getQuestData = (player) => FTBQuests.getData(player)

let getQuestObject = (level, id) => FTBQuests.getObject(level, id)

let isQuestComplete = (player, questObject) =>
  getQuestData(player).isCompleted(questObject)

let getQuestProgress = (player, questObject) =>
  getQuestData(player).getProgress(questObject)

let setQuestProgress = (player, questObject, progress) =>
  getQuestData(player).setProgress(questObject, progress)

let addQuestProgress = (player, questObject, amount) =>
  getQuestData(player).addProgress(questObject, amount)

let resetQuestObject = (player, questObject) => {
    let progressChange = $ProgressChange.createServerSide(questObject.getID(questObject), true, player.uuid, true)
    questObject.forceProgress(getQuestData(player), progressChange);
}
