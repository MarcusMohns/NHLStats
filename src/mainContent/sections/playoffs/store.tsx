const fetchPlayoffsData = async () => {
  const CORS_PROXY = "https://api.allorigins.win/get";
  const playoffsUrl = `${CORS_PROXY}?url=${encodeURIComponent("https://api-web.nhle.com/v1/playoff-bracket/2025")}`;
  // Run it by cors proxy to bypass CORS

  try {
    const response = await fetch(playoffsUrl);
    const data = await response.json();
    const parsedData = JSON.parse(data.contents);
    return parsedData;
  } catch (e) {
    console.error("Error fetching playoffs data from API", e);
    throw e;
  }
};

export const fetchPlayoffs = async () => {
  try {
    const playoffs = await fetchPlayoffsData();
    return playoffs;
  } catch (e) {
    console.error("Error fetching leaders data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
