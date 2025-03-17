import { StandingsType } from "../standings/Standings";

export const sortByGamesPlayed = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) => b.gamesPlayed - a.gamesPlayed
  );
export const sortByPoints = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) => b.points - a.points
  );
export const sortByWins = (standings: StandingsType[]) =>
  standings.toSorted((a: StandingsType, b: StandingsType) => b.wins - a.wins);

export const sortByLosses = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) => b.losses - a.losses
  );

export const sortByOTLosses = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) => b.otLosses - a.otLosses
  );

export const sortByGoalDifferential = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) =>
      b.goalDifferential - a.goalDifferential
  );

export const sortByLast10 = (standings: StandingsType[]) =>
  standings.toSorted(
    (a: StandingsType, b: StandingsType) => b.l10Wins - a.l10Wins
  );

export const sortByStreak = (standings: StandingsType[]) =>
  standings.toSorted((a: StandingsType, b: StandingsType) => {
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
      // If both teams have a the same streak return 0
      return primarySort;
    } else if (b.streakCode === "L" || a.streakCode === "L") {
      // If a and b are both on losing streaks sort them inversely (smaller -> bigger) - losing more is bad
      return a.streakCount - b.streakCount;
    } else {
      // if a and b are both on winning or OT streaks sort them as normal (bigger -> smaller) winning more is good!
      return b.streakCount - a.streakCount;
    }
  });
