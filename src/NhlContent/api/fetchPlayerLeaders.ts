const fetchPlayerLeaders = async (category: string, goalieOrSkater: string) => {
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

export default fetchPlayerLeaders;
