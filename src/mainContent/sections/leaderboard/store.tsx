const fetchPlayerLeadersData = async (
  category: string,
  goalieOrSkater: string
) => {
  const leadersUrl = `https://corsproxy.io/?url=https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=5`;
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
      Goals: await fetchPlayerLeadersData("goals", "skater"),
      Assists: await fetchPlayerLeadersData("assists", "skater"),
      Points: await fetchPlayerLeadersData("points", "skater"),
      GAA: await fetchPlayerLeadersData("goalsAgainstAverage", "goalie"),
      "Save%": await fetchPlayerLeadersData("savePctg", "goalie"),
      Shutouts: await fetchPlayerLeadersData("shutouts", "goalie"),
    };
    if (
      !leaders.Goals ||
      !leaders.Assists ||
      !leaders.Points ||
      !leaders.GAA ||
      !leaders["Save%"] ||
      !leaders.Shutouts
    ) {
      return new Error("No leaders data");
    } else {
      return leaders;
    }
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
