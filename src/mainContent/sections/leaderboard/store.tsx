export type ErrorType = {
  error: boolean;
  text: string;
  message: string;
  name: string;
};
export type LeaderBoardsType = {
  Goals: PlayerType[];
  Assists: PlayerType[];
  Points: PlayerType[];
  GAA: GoalieType[];
  "Save%": GoalieType[];
  Shutouts: GoalieType[];
};

export type PlayerType = {
  firstName: { default: string };
  headshot: string;
  id: number;
  lastName: { default: string };
  position: string;
  sweaterNumber: number;
  teamAbbrev: string;
  teamLogo: string;
  teamName: { default: string };
  value: number;
};

export type GoalieType = {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: { default: string };
  teamLogo: string;
  position: string;
  value: number;
};

const fetchPlayerLeadersData = async (
  category: string,
  goalieOrSkater: string
) => {
  const url = `https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[category];
  } catch (e: unknown) {
    console.error("Error fetching leaders data from API", e);
    throw e;
  }
};

export const fetchLeaders = async (
  setLeaderboards: (data: LeaderBoardsType) => void,
  setError: (e: ErrorType) => void,
  error: ErrorType
) => {
  try {
    const topGoalScorers = await fetchPlayerLeadersData("goals", "skater");
    const topAssists = await fetchPlayerLeadersData("assists", "skater");
    const topPoints = await fetchPlayerLeadersData("points", "skater");
    const topGoalsAgainstAverage = await fetchPlayerLeadersData(
      "goalsAgainstAverage",
      "goalie"
    );
    const topSavePctg = await fetchPlayerLeadersData("savePctg", "goalie");
    const topShutouts = await fetchPlayerLeadersData("shutouts", "goalie");

    if (
      !topGoalScorers ||
      !topAssists ||
      !topPoints ||
      !topSavePctg ||
      !topShutouts ||
      !topGoalsAgainstAverage
    ) {
      throw new Error("No leaders data");
    }

    setLeaderboards({
      Goals: topGoalScorers,
      Assists: topAssists,
      Points: topPoints,
      GAA: topGoalsAgainstAverage,
      "Save%": topSavePctg,
      Shutouts: topShutouts,
    });
    setError({ error: false, text: "", message: "", name: "" });
  } catch (e: unknown) {
    !error.error &&
      setError({
        error: true,
        text: "Something went wrong fetching leaderboard data🙁",
        message: (e as Error).message,
        name: "fetchLeaders",
      });
  }
};
