const $TeamStagesHelper = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamStagesHelper");
const $TeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");

const Teams = {
  getManager: () => {
    return $TeamsApi.api().getManager();
  },
  getTeam: (player) => {
    let opt = Teams.getManager().getTeamForPlayer(player);
    return opt.isPresent() ? opt.get() : null;
  },
  getData: (player) => {
    return Teams.getTeam(player).getExtraData();
  },
  setData: (player, key, value) => {
    let team = Teams.getTeam(player);
    if (team) {
      team.getExtraData()[key] = value;
      team.markDirty();
    }
  },
  getDataValue: (player, key) => {
    let data = Teams.getData(player);
    return data ? data[key] : null;
  },
  hasData: (player, key) => {
    let data = Teams.getData(player);
    return data ? data.hasOwnProperty(key) : false;
  },
  removeData: (player, key) => {
    let data = Teams.getData(player);
    if (data && data.hasOwnProperty(key)) {
      delete data[key];
    }
  },
  getName: (player) => {
    let team = Teams.getTeam(player);
    return team ? team.getShortName() : null;
  },
  getId: (player) => {
    let team = Teams.getTeam(player);
    return team ? team.getId() : null;
  },
  getTeamsDimensionByPlayer: (player) => {
    let teamBase = $BaseInstanceManager.get(player.getServer()).getBaseForPlayer(player);
    if (!teamBase.isPresent()) return null;
    return player.getServer().getLevel(teamBase.get().dimension().location());
  },
  hasStage: (player, teamstage) => {
    let team = Teams.getTeam(player);
    return team ? $TeamStagesHelper.hasTeamStage(player, teamstage) : false;
  },
  getTeamStages: (player) => {
    let team = Teams.getTeam(player);
    return team ? $TeamStagesHelper.getStages(team) : null;
  },
  addTeamStage: (player, stages) => {
    let team = Teams.getTeam(player);
    stages.forEach((stage) => $TeamStagesHelper.addTeamStage(team, stage));
  },
  removeTeamStages: (player, stages) => {
    let team = Teams.getTeam(player);
    stages.forEach((stage) => $TeamStagesHelper.removeTeamStage(team, stage));
  },
};
