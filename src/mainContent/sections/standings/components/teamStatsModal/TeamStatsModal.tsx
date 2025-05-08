import { useState, useEffect, useCallback, useMemo } from "react";
import { TeamType, TeamStatsType } from "../../types";
import Modal from "../../../../components/Modal";
import Chip from "../../../../components/Chip";
import SkaterCard from "./components/SkaterCard";
import GoalieCard from "./components/GoalieCard";
import TeamThisWeekSchedule from "./components/TeamThisWeekSchedule";
import ErrorWithBtn from "../../../../components/ErrorWithBtn";
import LinkOut from "../../../../components/LinkOut";
import { fetchTeamAndGames } from "./store";
import { spinner } from "../../../../../svgs";

type ModalProps = {
  handleCloseModal: () => void;
  team: TeamType;
};

const TeamStatsModal = ({ handleCloseModal, team }: ModalProps) => {
  const [modal, setModal] = useState<TeamStatsType | null | Error>(null);

  const Chips = useMemo(
    () => [
      { name: "Rank", value: team.rank },
      { name: "Points", value: team.points },
      { name: "Win Percentage", value: `${(team.winPctg * 100).toFixed(1)}%` },
      { name: "Conference", value: team.conferenceName },
      { name: "Division", value: team.divisionName },
    ],
    [team]
  );

  const handleFetchTeamAndGames = useCallback(async () => {
    const teamData = await fetchTeamAndGames(team);
    setModal(teamData);
  }, [team]);

  useEffect(() => {
    handleFetchTeamAndGames();
  }, [handleFetchTeamAndGames]);

  return (
    <Modal closeModal={handleCloseModal}>
      {!modal ? (
        // Render loading spinner inside the modal if data is not available
        <div className="flex flex-col items-center justify-center content-center h-180">
          {spinner}
        </div>
      ) : modal instanceof Error ? (
        // Render error message inside the modal if data fetch fails
        <ErrorWithBtn action={() => handleFetchTeamAndGames()} error={modal} />
      ) : (
        <div className="h-180">
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
              alt={`Logo of ${team.teamName.default}`}
              className="w-30 rounded-sm shadow-xl bg-gray-200 dark:hidden mr-2"
            />
            <img
              src={team.teamLogoDark}
              className="w-30 rounded-sm shadow-xl bg-stone-800 hidden dark:block mr-2"
              alt={`Dark mode logo of ${team.teamName.default}`}
            />
            <div className="flex flex-column gap-1 flex-wrap">
              {Chips.map((chip) => (
                <Chip color="text-white" bgColor="bg-gray-600" key={chip.name}>
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
              {modal.topSkaters.map((player) => (
                <SkaterCard player={player} key={player.playerId} />
              ))}
            </div>
            <div className="top-goalie-stats">
              <h2 className="font-medium text-left ml-2 text-xl">Top Goalie</h2>
              <GoalieCard
                player={modal.goalies[0]}
                key={modal.goalies[0].playerId}
              />
            </div>
          </div>
          <h2 className="font-medium text-left ml-2 text-xl">
            This Weeks Games
          </h2>
          <TeamThisWeekSchedule
            games={modal.games}
            teamAbbrev={team.teamAbbrev.default}
          />
        </div>
      )}
    </Modal>
  );
};

export default TeamStatsModal;
