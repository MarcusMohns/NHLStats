import { ErrorType } from "../sections/standings/Standings";
import { TeamType } from "../sections/standings/Standings";

const fetchThisWeeksGamesForTeam = async (
  team: TeamType,
  handleError: (error: ErrorType) => void
) => {
  try {
    handleError({ error: false, text: "", message: "", name: "" });
    const gamesThisWeekResponse = await fetch(
      `https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`
    );
    return await gamesThisWeekResponse.json();
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

export default fetchThisWeeksGamesForTeam;
