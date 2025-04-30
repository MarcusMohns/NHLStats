export type LeaderBoardsType = {
  [key: string]: PlayerType[] | GoalieType[];
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
