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
  const CORS_PROXY = "https://api.allorigins.win/raw";
  const teamUrl = `${CORS_PROXY}?url=${encodeURIComponent(`https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/now`)}`;
  const gamesUrl = `${CORS_PROXY}?url=${encodeURIComponent(`https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`)}`;
  // Run both by cors proxy to bypass CORS
  try {
    const teamDataPromise = fetchTeamData(teamUrl);
    const gamesThisWeekDataPromise = fetchTeamData(gamesUrl);

    const [teamData, gamesThisWeekData] = await Promise.all([
      teamDataPromise,
      gamesThisWeekDataPromise,
    ]);

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
