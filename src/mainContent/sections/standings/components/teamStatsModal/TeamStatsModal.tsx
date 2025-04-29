import { useState, useEffect, useCallback } from "react";
import { TeamType } from "../../store";
import { ErrorType } from "../../../leaderboard/store";
import Modal from "../../../../components/Modal";
import Chip from "../../../../components/Chip";
import SkaterCard from "./SkaterCard";
import GoalieCard from "./GoalieCard";
import PlayerCardSkeleton from "./PlayerCardSkeleton";
import TeamThisWeekSchedule from "./TeamThisWeekSchedule";
import ErrorWithBtn from "../../../../components/ErrorWithBtn";
import LinkOut from "../../../../components/LinkOut";
import { fetchTeamsAndGames, TeamStatsType } from "./store";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
};

const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [modal, setModal] = useState<TeamStatsType | null>(null);
  const [error, setError] = useState<ErrorType>({
    error: false,
    text: "",
    message: "",
    name: "",
  });

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

  const handleSetModal = useCallback(
    (team: TeamStatsType) => {
      setModal(team);
    },
    [setModal]
  );

  const handleSetError = useCallback(
    (error: ErrorType) => {
      setError(error);
    },
    [setError]
  );

  useEffect(() => {
    fetchTeamsAndGames(handleSetModal, handleSetError, team);
  }, []);

  if (error.error) {
    return (
      <ErrorWithBtn
        action={() => fetchTeamsAndGames(handleSetModal, handleSetError, team)}
        error={error}
      />
    );
  }

  return (
    <Modal closeModal={handleCloseModal}>
      <div>
        <h1 className="flex flex-row align-center justify-center items-center text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
          {team.teamName.default}
          <LinkOut
            linkOutStyles="ml-3"
            hrefString={`https://www.nhl.com/${team.teamCommonName.default.replace(
              /\s+/g,
              ""
            )}`}
          />
        </h1>
        <div className="m-2 flex flex-row p-2">
          <img
            src={team.teamLogo}
            alt={team.teamName.default}
            className="w-30 rounded-sm shadow-xl bg-slate-200 dark:hidden mr-2"
          />
          <img
            src={team.teamLogoDark}
            className="w-30 rounded-sm shadow-xl bg-stone-800 hidden dark:block mr-2"
          />
          <div className="flex flex-column gap-1 flex-wrap">
            {Chips.map((chip) => (
              <Chip color="text-white" bgColor="bg-slate-600" key={chip.name}>
                <p>
                  {chip.name}: {chip.value}
                </p>
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="top-skater-stats">
            <h2 className="font-medium text-left ml-2 text-xl">
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
          <div className="top-goalie-stats">
            <h2 className="font-medium text-left ml-2 text-xl">Top Goalie</h2>
            {modal ? (
              <GoalieCard
                player={modal.goalies[0]}
                key={modal.goalies[0].playerId}
              />
            ) : (
              <PlayerCardSkeleton key={`GoalieSkeleton`} />
            )}
          </div>
        </div>
        <h2 className="font-medium text-left ml-2 text-xl">This Weeks Games</h2>
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
                  className="flex flex-row shadow-md p-2 my-1.5 h-10 animate-pulse bg-gray-100 dark:bg-stone-800"
                  key={index}
                />
              ))}
      </div>
    </Modal>
  );
};

export default TeamStatsModal;
