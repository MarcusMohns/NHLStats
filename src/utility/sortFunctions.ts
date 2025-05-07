import { TeamType } from "../mainContent/sections/standings/types";

// Sorts by streak
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

// Reverse the standings (typically called on the second click of the sort button)
export const reverseStandings = (state: {
  standings: TeamType[];
  sortedBy: string;
}) => {
  return {
    standings: state.standings.toReversed(),
    sortedBy: state.sortedBy,
  };
};

export const sortFunctions: {
  [key: string]: (standings: TeamType[]) => TeamType[];
} = {
  // All the sort functions for our standings - called by running sortFunctions[key](standings)
  Team: (standings) =>
    standings.toSorted((a, b) =>
      a.teamName.default.localeCompare(b.teamName.default)
    ),
  Rank: (standings) => standings.toSorted((a, b) => b.rank - a.rank),
  "Games Played": (standings) =>
    standings.toSorted((a, b) => b.gamesPlayed - a.gamesPlayed),
  Points: (standings) => standings.toSorted((a, b) => b.points - a.points),
  Wins: (standings) => standings.toSorted((a, b) => b.wins - a.wins),
  Losses: (standings) => standings.toSorted((a, b) => b.losses - a.losses),
  "OT Losses": (standings) =>
    standings.toSorted((a, b) => b.otLosses - a.otLosses),
  "Goal Difference": (standings) =>
    standings.toSorted((a, b) => b.goalDifferential - a.goalDifferential),
  "Last 10": (standings) => standings.toSorted((a, b) => b.l10Wins - a.l10Wins),
  Streak: (standings) => sortByStreak(standings),
};
