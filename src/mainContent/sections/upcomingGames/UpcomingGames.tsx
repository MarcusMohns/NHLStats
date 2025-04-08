import { useEffect, useState } from "react";
import fetchUpcomingGames from "../../api/fetchUpcomingGames";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import { ErrorType } from "../standings/Standings";
import { linkOutIcon, spinner } from "../../../svgs";
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

  const [error, setError] = useState<ErrorType>({
    error: false,
    text: "",
    message: "",
    name: "",
  });

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

  const fetchAndSetUpcomingGames = async () => {
    try {
      const upcomingGamesData = await fetchUpcomingGames();
      if (!upcomingGamesData) {
        throw new Error("No Upcoming Games data");
      } else {
        setUpcomingGames(upcomingGamesData);
        setError({ error: false, text: "", message: "", name: "" });
      }
    } catch (e) {
      !error.error &&
        setError({
          error: true,
          text: "Something went wrong setting Upcoming Games 🙁",
          message: (e as Error).message,
          name: "fetchAndSetUpcomingGames",
        });
      throw e;
    }
  };

  useEffect(() => {
    fetchAndSetUpcomingGames();
  }, []);

  let lastRenderedWeekday: string | null = null;

  if (error.error) {
    return <ErrorWithBtn error={error} action={fetchAndSetUpcomingGames} />;
  }

  if (!upcomingGames) {
    return (
      <div className="relative  xl:w-5/20 2xl:w-4/20 rounded p-3 h-235 bg-stone-300 dark:bg-stone-700 animate-pulse ">
        {spinner}
      </div>
    );
  }

  return (
    <section className="upcoming-games bg-stone-100 dark:bg-stone-900 xl:w-5/20 2xl:w-4/20 shadow-md rounded  sm:p-3 h-max 2xl:border border-stone-300 dark:border-stone-700">
      <h2 className="font-bold dark:text-stone-300 mt-5 py-1 px-1 text-2xl uppercase leading-tight tracking-wide">
        Upcoming Games
      </h2>
      {upcomingGames.map((gameDay) => (
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
                  // Since New Date recalculates time and sometimes day we can't use the Weekday provided in API
                  // check weekDay instead and render a H2 if it's a different day from last iteration

                  <div className="flex text-lg flex-row w-full mt-4 py-2 font-bold dark:text-stone-300 uppercase leading-tight tracking-wide border-b border-gray-300 dark:border-stone-700">
                    <h2 className="px-2 sm:px-0">
                      {locale} {(lastRenderedWeekday = weekday)}
                    </h2>
                    <p className="flex text-center align-end justify-end">
                      ({date.getDate()}/{date.getMonth() + 1}/
                      {date.getFullYear()})
                    </p>
                  </div>
                )}
                <div className="flex flex-row align-center justify-center shadow-sm bg-white dark:bg-stone-800 dark:shadow-stone-800 p-2 mt-1 rounded">
                  {game.gameState === "LIVE" ? (
                    <div className="flex flex-row items-center px-2 w-max rounded bg-green-700 hover:bg-green-600">
                      <a
                        className="text-white underline ml-auto flex flex-row text-xs items-center"
                        href={`https://www.nhl.com${game.gameCenterLink}`}
                        target="_blank"
                      >
                        Live
                      </a>
                      <span className="rounded-full bg-red-500 w-3 h-3 ml-1 animate-pulse block" />
                    </div>
                  ) : (
                    <p className="flex items-center bg-stone-200 text-sm font-bold px-1 dark:bg-stone-700 rounded w-min ">
                      {formattedDateTime}
                    </p>
                  )}
                  <div className="flex flex-row items-center justify-center align-center dark:text-stone-300  text-stone-800 w-full flex-space-between font-bold">
                    <p className="flex flex-row items-center justify-center min-w-20">
                      {game.awayTeam.abbrev}
                      <img
                        className="w-8 h-8 dark:hidden"
                        src={game.awayTeam.logo}
                      />
                      <img
                        className="w-8 h-8 hidden dark:block"
                        src={game.awayTeam.darkLogo}
                      />
                    </p>
                    <p className="w-5">vs</p>
                    <p className="flex flex-row items-center justify-center min-w-20">
                      <img
                        className="w-8 h-8 dark:hidden"
                        src={game.homeTeam.logo}
                      />
                      <img
                        className="w-8 h-8 hidden dark:block"
                        src={game.homeTeam.darkLogo}
                      />
                      {game.homeTeam.abbrev}
                    </p>
                    <a
                      href={`https://www.nhl.com${game.gameCenterLink}`}
                      className="flex items-center h-full"
                      target="_blank"
                    >
                      {linkOutIcon}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default UpcomingGames;
