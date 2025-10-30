const $TeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");

const Teams = {
    getManager: () => {
        return $TeamsApi.api().getManager();
    },
    getTeam: (player) => {
        return Teams.getManager().getTeamForPlayer(player).get();
    },
    getData: (player) => {
        return Teams.getTeam(player).getExtraData();
    },
    setData: (player, key, value) => {
        let team = Teams.getTeam(player);
        if (team) {
            team.getExtraData()[key] = value
            team.markDirty()
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
    }
};


