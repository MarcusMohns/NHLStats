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
  const scheduleUrl =
    // Run it by https://corsproxy.io/ to bypass CORS
    "https://corsproxy.io/?url=https://api-web.nhle.com/v1/schedule/now";

  try {
    const response = await fetch(scheduleUrl);
    const { gameWeek } = await response.json();
    return gameWeek;
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
