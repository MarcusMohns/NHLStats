import { useState, useEffect } from "react";
import { sortByPoints } from "../../utility/sortFunctions";
import { TeamType } from "../Standings";
import Modal from "../../../components/Modal";
import Chip from "../../../components/Chip";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
  rank: number;
};

type PlayerType = {
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
export type TeamStatsType = {
  skaters: PlayerType[];
  goalies: PlayerType[];
  gameType: number;
  season: string;
};

const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [modalData, setModalData] = useState<TeamStatsType | null>(null);

  const playersByPoints = modalData?.skaters
    ? sortByPoints(modalData.skaters)
    : null;

  const top3Players = playersByPoints?.slice(0, 3);

  const Chips = [
    { name: "Rank", value: team.rank },
    { name: "Points", value: team.points },
    { name: "Conference", value: team.conferenceName },
    { name: "Division", value: team.divisionName },
    {
      name: "Win Percentage",
      value: (team.winPctg * 100).toFixed(1) + "%",
    },
  ];

  // console.log(playersByPoints[0]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch(
        `https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/20242025/2`
      );
      const data = await response.json();
      setModalData(data);
    };
    fetchTeams();
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
            <Chip color="white" bgColor="slate">
              <p>
                {chip.name}: {chip.value}
              </p>
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <h2>Top 3 Point Scorers</h2>
          {top3Players?.map((player) => (
            <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2">
              <img
                className="w-20 h-20 rounded-full bg-gray-300 "
                src={player.headshot}
              />
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center text-center w-full text-md text-gray-900 uppercase font-medium mr-20 mb-2">
                  {player.firstName.default} {player.lastName.default}{" "}
                </div>
                <div className="flex flex-row flex-wrap">
                  <div className="flex mx-5">Points: {player.points} </div>
                  <div className="flex mx-5">Goals: {player.goals}</div>
                  <div className="flex mx-5">Assists: {player.assists} </div>
                  <div className="flex mx-5">
                    Plus/Minus: {player.plusMinus}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamStatsModal;
