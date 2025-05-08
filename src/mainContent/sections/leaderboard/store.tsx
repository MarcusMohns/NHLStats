const fetchPlayerLeadersData = async (
  category: string,
  goalieOrSkater: string,
  limit: number = 5
) => {
  const CORS_PROXY = "https://corsproxy.io/";
  const leadersUrl = `${CORS_PROXY}?url=https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=${limit}`;
  // Run it by https://corsproxy.io/ to bypass CORS

  try {
    const response = await fetch(leadersUrl);
    const data = await response.json();
    return data[category];
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    throw e;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const leaders = {
      Goals: await fetchPlayerLeadersData("goals", "skater", 5),
      Assists: await fetchPlayerLeadersData("assists", "skater", 5),
      Points: await fetchPlayerLeadersData("points", "skater", 5),
      GAA: await fetchPlayerLeadersData("goalsAgainstAverage", "goalie", 5),
      "Save%": await fetchPlayerLeadersData("savePctg", "goalie", 5),
      Shutouts: await fetchPlayerLeadersData("shutouts", "goalie", 5),
    };
    if (
      !leaders.Goals ||
      !leaders.Assists ||
      !leaders.Points ||
      !leaders.GAA ||
      !leaders["Save%"] ||
      !leaders.Shutouts
    ) {
      console.error("Incomplete leaderboard data");
      return new Error("Incomplete leaderboard data");
    } else {
      return leaders;
    }
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
