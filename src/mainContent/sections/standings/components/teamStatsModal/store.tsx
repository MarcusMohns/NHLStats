import { TeamType } from "../../types.ts";
import { sortFunctions } from "../../../../../utility/sortFunctions";

const fetchTeamData = async (urlString: string) => {
  const url = urlString;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e: unknown) {
    console.error("Error fetching team data from API", e);
    throw e;
  }
};

export const fetchTeamAndGames = async (team: TeamType) => {
  const CORS_PROXY = "https://corsproxy.io/";
  const teamUrl = `${CORS_PROXY}?url=https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/now`;
  const gamesUrl = `${CORS_PROXY}?url=https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`;
  // Run both by https://corsproxy.io/ to bypass CORS
  try {
    const teamData = await fetchTeamData(teamUrl);
    const gamesThisWeekData = await fetchTeamData(gamesUrl);
    if (!teamData || !gamesThisWeekData) throw new Error("Error getting data");

    const playersByPoints = sortFunctions.Points(teamData.skaters);
    const goaliesByPercentage = sortFunctions.Points(teamData.goalies);
    const topSkaters = playersByPoints.slice(0, 2);
    const topGoalie = goaliesByPercentage[0];

    return {
      ...teamData,
      topSkaters: topSkaters,
      topGoalie: topGoalie,
      games: gamesThisWeekData.games,
    };
  } catch (e) {
    console.error("Error fetching team data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
