const fetchSchedule = async () => {
  const url = `https://api-web.nhle.com/v1/schedule/now`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.gameWeek;
  } catch (e: unknown) {
    console.error("Error Schedule data from API", e);
    throw e;
  }
};

export default fetchSchedule;
