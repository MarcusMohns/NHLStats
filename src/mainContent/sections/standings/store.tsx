export type TeamType = {
  clinchIndicator?: string;
  rank: number;
  teamName: { default: string };
  teamAbbrev: { default: string };
  teamCommonName: { default: string };
  teamLogo: string;
  teamLogoDark: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalDifferential: number;
  l10Wins: number;
  l10Losses: number;
  l10OtLosses: number;
  streakCode: string;
  streakCount: number;
  conferenceName: string;
  divisionName: string;
  wildCardSequence: number;
  winPctg: number;
};

export type StandingsType = {
  [key: string]: TeamType[];
  League: TeamType[];
  Western: TeamType[];
  Eastern: TeamType[];
  Central: TeamType[];
  Atlantic: TeamType[];
  Metropolitan: TeamType[];
  Pacific: TeamType[];
};

export const handleReduceStandings = (standingsData: TeamType[]) =>
  standingsData.reduce(
    // Add the teams into correct League, Conference and Division - then set to state
    (acc: StandingsType, team: TeamType) => {
      const teamLogoDark = `https://assets.nhle.com/logos/nhl/svg/${team.teamAbbrev.default}_dark.svg`;
      const teamAndDarkLogo = { ...team, teamLogoDark };
      // Dark Logo is missing from the API call for some reason, add it manually for now.
      acc.League.push({
        ...teamAndDarkLogo,
        rank: acc.League.length + 1,
      });
      acc[team.conferenceName].push({
        ...teamAndDarkLogo,
        rank: acc[team.conferenceName].length + 1,
      });
      acc[team.divisionName].push({
        ...teamAndDarkLogo,
        rank: acc[team.divisionName].length + 1,
      });
      return acc;
    },
    {
      League: [],
      Western: [],
      Eastern: [],
      Central: [],
      Atlantic: [],
      Metropolitan: [],
      Pacific: [],
    }
  );

const fetchStandingsData = async () => {
  const standingsUrl =
    "https://corsproxy.io/?url=https://api-web.nhle.com/v1/standings/now";
  // Run it by https://corsproxy.io/ to bypass CORS

  try {
    const response = await fetch(standingsUrl);
    const data = await response.json();
    return data.standings;
  } catch (e: unknown) {
    console.error("Error fetching standings data from API", e);
    throw e;
  }
};

export const fetchStandings = async () => {
  try {
    const standingsData = await fetchStandingsData();
    if (!standingsData) {
      console.error("No standings data");
      return new Error("No standings data");
    } else {
      const standings = handleReduceStandings(standingsData);
      return standings;
    }
  } catch (e) {
    console.error("Error fetching standings data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};

export const headers = {
  full: [
    "Rank",
    "Team",
    "Points",
    "Games Played",
    "Wins",
    "Losses",
    "OT Losses",
    "Goal Difference",
    "Last 10",
    "Streak",
  ],
  abbreviated: ["R", "Team", "Pts", "GP", "W", "L", "OTL", "GD", "L10", "STK"],
};

export default fetchStandings;
