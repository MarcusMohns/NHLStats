import { useEffect, useState } from "react";
import fetchSchedule from "../../api/fetchSchedule";

type TeamType = {
  id: number;
  commonName: { default: string; [lang: string]: string };
  placeName: { default: string; [lang: string]: string };
  placeNameWithPreposition: { default: string; [lang: string]: string };
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad: boolean;
  score?: number;
};

type GameType = {
  id: number;
  season: number;
  gameType: number;
  venue: { default: string; es?: string; fr?: string };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  // tvBroadcasts: Broadcast[];
  alternateBroadcasts?: {
    country: string;
    descriptions: { default: string }[];
  }[];
  awayTeam: TeamType;
  homeTeam: TeamType;
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  gameOutcome?: { lastPeriodType: string };
  winningGoalie?: {
    playerId: number;
    firstInitial: { default: string };
    lastName: { default: string; cs?: string; fi?: string; sk?: string };
  };
  winningGoalScorer?: {
    playerId: number;
    firstInitial: { default: string };
    lastName: { default: string };
  };
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  condensedGame?: string;
  condensedGameFr?: string;
  gameCenterLink: string;
  ticketsLink?: string;
  ticketsLinkFr?: string;
};

type GameWeek = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: GameType[];
};

const UpcomingGames = () => {
  const [upcomingGames, setUpcomingGames] = useState<null | GameWeek[]>(null);

  const locale = navigator.language;
  // gets the users locale to format the date correctly

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetchSchedule().then((schedule) => {
      setUpcomingGames(schedule);
    });
  }, []);

  let lastRenderedWeekday: string | null = null;

  return (
    <section className="UpcomingGames">
      <div className="flex flex-col">
        <h2 className="text-2xl">UpcomingGames</h2>

        {upcomingGames ? (
          upcomingGames.map((gameDay) => (
            <div key={gameDay.date}>
              {gameDay.games.map((game) => {
                if (game.gameOutcome) {
                  return null;
                }
                const date = new Date(game.startTimeUTC);
                const weekday = weekDays[date.getDay()];
                // New Date calculates and takes into account the users timezone and daylight savings time (DST).
                const formattedDateTime = new Intl.DateTimeFormat(
                  locale || "sv-SE",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ).format(date);
                return (
                  <div key={game.id} className="flex flex-col">
                    {weekday !== lastRenderedWeekday && (
                      // Since New Date has corrected for timezones and DST, only render the date if it is the first game of the day
                      <h2 className="text-2xl">
                        {" "}
                        {weekDays[date.getDay()]} - {date.getDate()}/
                        {date.getMonth() + 1}/{date.getFullYear()}{" "}
                      </h2>
                    )}
                    <div className="flex flex-row">
                      <p className="flex flex-row">
                        {game.awayTeam.abbrev}
                        <img className="w-12" src={game.awayTeam.logo} />
                      </p>
                      <p>{formattedDateTime}</p>
                      <p className="flex flex-row">
                        {game.homeTeam.abbrev}
                        <img className="w-12" src={game.homeTeam.darkLogo} />
                      </p>
                    </div>
                    {(lastRenderedWeekday = weekday)}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div>loading</div>
        )}
      </div>
    </section>
  );
};

export default UpcomingGames;
