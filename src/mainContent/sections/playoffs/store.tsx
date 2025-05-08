const fetchPlayoffsData = async () => {
  const CORS_PROXY = "https://corsproxy.io/";
  const playoffsUrl = `${CORS_PROXY}?url=https://api-web.nhle.com/v1/playoff-bracket/2025`;
  // Run it by https://corsproxy.io/ to bypass CORS

  try {
    const response = await fetch(playoffsUrl);
    const data = await response.json();
    return data;
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
