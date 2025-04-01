const fetchStandings = async () => {
  const url = "https://api-web.nhle.com/v1/standings/now";
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const options = {
    method: "GET",
    headers,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.standings;
  } catch (e: unknown) {
    console.error("Error getting standings:", e);
  }
};

export default fetchStandings;
