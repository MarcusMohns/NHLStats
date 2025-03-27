import { useState, useEffect } from "react";
import { sortByPoints } from "../../utility/sortFunctions";
import { TeamType } from "../Standings";
import Modal from "../../../components/Modal";
import Chip from "../../../components/Chip";
import SkaterCard from "./SkaterCard";
import PlayerCardSkeleton from "./PlayerCardSkeleton";
import GoalieCard from "./GoalieCard";
import TeamThisWeekSchedule from "./TeamThisWeekSchedule";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
};

export type GameType = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: {
    default: string;
    es?: string;
    fr?: string;
  };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  awayTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
      fr?: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr?: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    awaySplitSquad: boolean;
    radioLink?: string;
    hotelLink?: string;
    hotelDesc?: string;
    score?: number;
  };
  homeTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
      fr?: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr?: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    homeSplitSquad: boolean;
    radioLink?: string;
    hotelLink?: string;
    hotelDesc?: string;
    score?: number;
  };
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  ticketsLink?: string;
  ticketsLinkFr?: string;
  gameCenterLink: string;
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  condensedGame?: string;
  condensedGameFr?: string;
};

export type SkaterType = {
  assists: number;
  avgShiftsPerGame: number;
  avgTimeOnIcePerGame: number;
  faceoffWinPctg: number;
  firstName: { default: string };
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  headshot: string;
  lastName: { default: string };
  overtimeGoals: number;
  penaltyMinutes: number;
  playerId: number;
  plusMinus: number;
  points: number;
  positionCode: string;
  powerPlayGoals: number;
  shootingPctg: number;
  shorthandedGoals: number;
  shots: number;
};

export type GoalieType = {
  assists: number;
  firstName: { default: string };
  gamesPlayed: number;
  gamesStarted: number;
  goals: number;
  goalsAgainst: number;
  goalsAgainstAverage: number;
  headshot: string;
  lastName: { default: string };
  losses: number;
  overtimeLosses: number;
  penaltyMinutes: number;
  playerId: number;
  points: number;
  savePercentage: number;
  saves: number;
  shotsAgainst: number;
  shutouts: number;
  ties: number;
  timeOnIce: number;
  wins: number;
};

export type TeamStatsType = {
  skaters: SkaterType[];
  goalies: GoalieType[];
  gameType: number;
  games: GameType[];
  season: string;
  topSkaters: SkaterType[];
  topGoalie: GoalieType;
};

const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [modal, setModal] = useState<TeamStatsType | null>(null);

  const Chips = [
    { name: "Rank", value: team.rank },
    { name: "Points", value: team.points },
    {
      name: "Win Percentage",
      value: `${(team.winPctg * 100).toFixed(1)}%`,
    },
    { name: "Conference", value: team.conferenceName },
    { name: "Division", value: team.divisionName },
  ];
  useEffect(() => {
    const fetchTeamsAndWeeklyStats = async () => {
      const teamResponse = await fetch(
        `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/20242025/2`
      );
      const gamesThisWeekResponse = await fetch(
        `https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`
      );

      const teamData = await teamResponse.json();
      const gamesThisWeekData = await gamesThisWeekResponse.json();

      const playersByPoints = sortByPoints(teamData.skaters);
      const goaliesByPercentage = sortByPoints(teamData.goalies);
      const topSkaters = playersByPoints.slice(0, 2);
      const topGoalie = goaliesByPercentage[0];

      setModal({
        ...teamData,
        topSkaters: topSkaters,
        topGoalie: topGoalie,
        games: gamesThisWeekData.games,
      });
    };
    try {
      fetchTeamsAndWeeklyStats();
    } catch {
      console.error("uh oh..");
    }
  }, []);

  return (
    <Modal closeModal={handleCloseModal}>
      <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {team.teamName.default}
      </h1>
      <div className="m-2 flex flex-row p-2">
        <img
          className="w-30 rounded-sm shadow-xl bg-slate-200 mr-2"
          src={team.teamLogo}
        />
        <div className="flex flex-column gap-1 flex-wrap">
          {Chips.map((chip) => (
            <Chip color="text-white" bgColor="bg-cyan-800" key={chip.name}>
              <p>
                {chip.name}: {chip.value}
              </p>
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <h2 className="font-medium text-left ml-2 text-xl text-gray-800">
            Top Point Scorers
          </h2>
          {modal
            ? modal.topSkaters.map((player) => (
                <SkaterCard player={player} key={player.playerId} />
              ))
            : new Array(2)
                .fill("")
                .map((_, index) => <PlayerCardSkeleton key={index} />)}
        </div>
        <h2 className="font-medium text-left ml-2 text-xl text-gray-800">
          Top Goalie
        </h2>
        {modal ? (
          <GoalieCard
            player={modal.goalies[0]}
            key={modal.goalies[0].playerId}
          />
        ) : (
          <PlayerCardSkeleton key={`GoalieSkeleton`} />
        )}
      </div>
      <h2 className="font-medium text-left ml-2 text-xl text-gray-800">
        This Weeks Games
      </h2>
      {modal
        ? modal.games.map((game) => (
            <TeamThisWeekSchedule
              key={game.id}
              game={game}
              teamAbbrev={team.teamAbbrev.default}
            />
          ))
        : new Array(3)
            .fill("")
            .map((_, index) => (
              <div
                className="flex flex-row shadow-md p-2 my-1.5 h-10 animate-pulse bg-gray-100"
                key={index}
              />
            ))}
    </Modal>
  );
};

export default TeamStatsModal;
