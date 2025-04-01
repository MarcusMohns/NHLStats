import { TeamType } from "../sections/standings/Standings";

const fetchTeam = async (team: TeamType) => {
  try {
    const teamResponse = await fetch(
      `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/20242025/2`
    );
    return await teamResponse.json();
  } catch (e: unknown) {
    console.error(e);
    return;
  }
};

export default fetchTeam;
