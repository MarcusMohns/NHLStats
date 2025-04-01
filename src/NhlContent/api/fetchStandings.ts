import { ErrorType } from "../sections/standings/Standings";

const fetchStandings = async (handleSetError: (error: ErrorType) => void) => {
  const url = "https://api-web.nhle.com/v1/standings/now";
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const options = {
    method: "GET",
    headers,
  };
  try {
    handleSetError({ error: false, text: "", message: "", name: "" });
    const response = await fetch(url, options);
    const data = await response.json();
    return data.standings;
  } catch (e: unknown) {
    console.error("Error getting standings:", e);
    handleSetError({
      error: true,
      text: "Something went wrong fetching standings 🙁",
      message: (e as Error).message,
      name: (e as Error).name,
    });
  }
};

export default fetchStandings;
