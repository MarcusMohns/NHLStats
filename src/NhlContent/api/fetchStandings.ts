const fetchStandings = async (
  setStandings: (standings: Array<{}>) => void,
  setError: (error: boolean) => void
) => {
  const url = "https://api-web.nhle.com/v1/standings/now";
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    setStandings(data);
  } catch (error) {
    console.error("Error getting weather:", error);
    setError(true);
    // setLoading(false);
  }
};

export default fetchStandings;
