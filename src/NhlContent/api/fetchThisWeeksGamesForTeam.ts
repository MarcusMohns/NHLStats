import { TeamType } from "../sections/standings/Standings";

const fetchThisWeeksGamesForTeam = async (team: TeamType) => {
  try {
    const gamesThisWeekResponse = await fetch(
      `https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`
    );
    return await gamesThisWeekResponse.json();
  } catch (e: unknown) {
    console.error(e);
    return;
  }
};

export default fetchThisWeeksGamesForTeam;
