import { TeamType } from "../sections/standings/Standings";

const fetchThisWeeksGamesForTeam = async (team: TeamType) => {
  const url = `https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data.json();
  } catch (e: unknown) {
    console.error("Error fetching this weeks games data from API", e);
    throw e;
  }
};

export default fetchThisWeeksGamesForTeam;
