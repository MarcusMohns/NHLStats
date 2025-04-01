const fetchPlayerLeaders = async (category: string, goalieOrSkater: string) => {
  const url = `https://api-web.nhle.com/v1/${goalieOrSkater}-stats-leaders/current?categories=${category}&limit=5`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const options = {
    method: "GET",
    headers,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data[category];
  } catch (e: unknown) {
    console.error("Error getting standings:", e);
  }
};

export default fetchPlayerLeaders;
