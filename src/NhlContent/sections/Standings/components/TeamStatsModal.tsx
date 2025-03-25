import { useState, useEffect } from "react";
import { sortByPoints } from "../../utility/sortFunctions";
import { TeamType } from "../Standings";
import Modal from "../../../components/Modal";
import Chip from "../../../components/Chip";
import SkaterCard from "./SkaterCard";
import PlayerCardSkeleton from "./PlayerCardSkeleton";
import GoalieCard from "./GoalieCard";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
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
  season: string;
  topThreeSkaters: SkaterType[];
  topGoalie: GoalieType;
};

const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [modalData, setModalData] = useState<TeamStatsType | null>(null);

  const Chips = [
    { name: "Rank", value: team.rank },
    { name: "Points", value: team.points },
    { name: "Conference", value: team.conferenceName },
    { name: "Division", value: team.divisionName },
    {
      name: "Win Percentage",
      value: `${(team.winPctg * 100).toFixed(1)}%`,
    },
  ];
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch(
        `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/20242025/2`
      );
      const data = await response.json();

      const playersByPoints = sortByPoints(data.skaters);
      const goaliesByPercentage = sortByPoints(data.goalies);

      const topThreeSkaters = playersByPoints.slice(0, 3);
      const topGoalie = goaliesByPercentage[0];

      setModalData({
        ...data,
        topThreeSkaters: topThreeSkaters,
        topGoalie: topGoalie,
      });
    };

    try {
      fetchTeams();
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
            <Chip color="white" bgColor="slate" key={chip.name}>
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
          {modalData
            ? modalData.topThreeSkaters.map((player) => (
                <SkaterCard player={player} key={player.playerId} />
              ))
            : new Array(3)
                .fill("")
                .map((_, index) => <PlayerCardSkeleton key={index} />)}
        </div>
        <h2 className="font-medium text-left ml-2 text-xl text-gray-800">
          Top Goalie
        </h2>
        {modalData ? (
          <GoalieCard
            player={modalData.goalies[0]}
            key={modalData.goalies[0].playerId}
          />
        ) : (
          <PlayerCardSkeleton key={`GoalieSkeleton`} />
        )}
      </div>
    </Modal>
  );
};

export default TeamStatsModal;
