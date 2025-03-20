import { TeamType } from "../standings/Standings";

export const sortByGamesPlayed = (standings: TeamType[]) =>
  standings.toSorted(
    (a: TeamType, b: TeamType) => b.gamesPlayed - a.gamesPlayed
  );
export const sortByRank = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.rank - a.rank);

export const sortByTeamName = (standings: TeamType[]) => {
  return standings.toSorted((a: TeamType, b: TeamType) =>
    a.teamName.default.localeCompare(b.teamName.default)
  );
};

export const sortByPoints = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.points - a.points);
export const sortByWins = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.wins - a.wins);

export const sortByLosses = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.losses - a.losses);

export const sortByOTLosses = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.otLosses - a.otLosses);

export const sortByGoalDifferential = (standings: TeamType[]) =>
  standings.toSorted(
    (a: TeamType, b: TeamType) => b.goalDifferential - a.goalDifferential
  );

export const sortByLast10 = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => b.l10Wins - a.l10Wins);

export const sortByStreak = (standings: TeamType[]) =>
  standings.toSorted((a: TeamType, b: TeamType) => {
    const streakPriority = (streakCode: string) => {
      switch (streakCode) {
        case "W":
          return 2;
        case "OT":
          return 1;
        case "L":
          return 0;
        default:
          return -1;
      }
    };

    const primarySort =
      streakPriority(b.streakCode) - streakPriority(a.streakCode);
    // first, sort by the type of streak (winning, overtime, losing, or none)
    // this is done by assigning a priority to each type of streak and
    // comparing the priorities
    if (primarySort !== 0) {
      // If both teams have a the same streak return 0 (treated equally)
      return primarySort;
    } else if (b.streakCode === "L" || a.streakCode === "L") {
      // If a and b are both on losing streaks sort them inversely (smaller -> bigger) - losing more is bad
      return a.streakCount - b.streakCount;
    } else {
      // if a and b are both on winning or OT streaks sort them as normal (bigger -> smaller) winning more is good!
      return b.streakCount - a.streakCount;
    }
  });

export const reverseStandings = (state: {
  standings: TeamType[];
  sortedBy: String;
}) => {
  return {
    standings: state.standings.toReversed(),
    sortedBy: state.sortedBy,
  };
};

export const sortFunctions: {
  [key: string]: (standings: TeamType[]) => TeamType[];
} = {
  Rank: sortByRank,
  Team: sortByTeamName,
  "Games Played": sortByGamesPlayed,
  Points: sortByPoints,
  Wins: sortByWins,
  Losses: sortByLosses,
  "OT Losses": sortByOTLosses,
  "Goal Difference": sortByGoalDifferential,
  "Last 10": sortByLast10,
  Streak: sortByStreak,
};
