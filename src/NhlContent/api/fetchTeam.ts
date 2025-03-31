import { ErrorType } from "../sections/standings/Standings";
import { TeamType } from "../sections/standings/Standings";

const fetchTeam = async (
  team: TeamType,
  handleError: (error: ErrorType) => void
) => {
  try {
    handleError({ error: false, text: "", message: "", name: "" });
    const teamResponse = await fetch(
      `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/20242025/2`
    );
    return await teamResponse.json();
  } catch (e: unknown) {
    console.error(e);
    handleError({
      error: true,
      text: "Something went wrong getting team 🙁",
      message: (e as Error).message,
      name: (e as Error).name,
    });
    return;
  }
};

export default fetchTeam;
