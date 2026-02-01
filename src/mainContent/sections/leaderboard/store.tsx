const fetchPlayerLeadersData = async (
  category: string,
  goalieOrSkater: string,
  limit: number = 5,
) => {
  const CORS_PROXY = "https://api.allorigins.win/raw";
  const leadersUrl = `${CORS_PROXY}?url=${encodeURIComponent(
    `https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=${limit}`,
  )}`;
  // Run it by cors proxy to bypass CORS

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
    const fetchPromises = [
      fetchPlayerLeadersData("goals", "skater", 5),
      fetchPlayerLeadersData("assists", "skater", 5),
      fetchPlayerLeadersData("points", "skater", 5),
      fetchPlayerLeadersData("goalsAgainstAverage", "goalie", 5),
      fetchPlayerLeadersData("savePctg", "goalie", 5),
      fetchPlayerLeadersData("shutouts", "goalie", 5),
    ];
    const data = await Promise.all(fetchPromises);
    const leaders = {
      Goals: data[0],
      Assists: data[1],
      Points: data[2],
      GAA: data[3],
      "Save%": data[4],
      Shutouts: data[5],
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
