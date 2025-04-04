import { TeamType } from "../sections/standings/Standings";

const fetchTeam = async (team: TeamType) => {
  const url = `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/now`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
  } catch (e: unknown) {
    console.error("Error fetching team data from API", e);
    throw e;
  }
};

export default fetchTeam;
