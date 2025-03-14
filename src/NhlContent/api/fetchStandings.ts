import { StandingsType } from "../sections/Standings/Standings";
const fetchStandings = async (
  setStandings: (standings: StandingsType[]) => void,
  setError: (error: {
    error: boolean;
    text: string;
    message: string;
    name: string;
  }) => void
) => {
  const url = "https://api-web.nhle.com/v1/standings/now";
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const options = {
    method: "GET",
    headers,
  };
  try {
    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    setStandings(data.standings);
  } catch (error: unknown) {
    console.error("Error getting standings:", error);
    setError({
      error: true,
      text: "Something went wrong getting standings 🙁",
      message: (error as Error).message,
      name: (error as Error).name,
    });
    // setLoading(false);
  }
};

export default fetchStandings;
