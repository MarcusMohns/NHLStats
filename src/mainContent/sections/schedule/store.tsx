export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fetchScheduleData = async () => {
  const CORS_PROXY = "https://api.allorigins.win/get";
  const scheduleUrl = `${CORS_PROXY}?url=${encodeURIComponent("https://api-web.nhle.com/v1/schedule/now")}`;
  // Run it by cors proxy to bypass CORS

  try {
    const response = await fetch(scheduleUrl);
    const data = await response.json();
    const parsedData = JSON.parse(data.contents);
    return parsedData.gameWeek;
  } catch (e) {
    console.error("Error fetching schedule from API", e);
    throw e;
  }
};

export const fetchSchedule = async () => {
  try {
    const scheduleData = await fetchScheduleData();
    if (!scheduleData) {
      console.error("No schedule data");
      throw new Error("No schedule data");
    } else {
      return scheduleData;
    }
  } catch (e) {
    console.error("Error fetching schedule data from API", e);
    return new Error("Error fetching data from the server ☹️");
  }
};
