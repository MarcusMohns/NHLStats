const fetchStandings = async () => {
  const url = "https://api-web.nhle.com/v1/standings/now";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.standings;
  } catch (e: unknown) {
    console.error("Error fetching standings data from API", e);
    throw e;
  }
};

export default fetchStandings;
