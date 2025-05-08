import { TeamType, StandingsTableType } from "../../types.ts";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useMemo,
} from "react";
import StyledTable from "./StyledTable.tsx";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";

type WildCardTableProps = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  western: TeamType[];
  eastern: TeamType[];
  selectedTable: string;
};

const WildCardTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  western,
  eastern,
  selectedTable,
}: WildCardTableProps) => {
  const topThreeCentral = central.slice(0, 3);
  const topThreeAtlantic = atlantic.slice(0, 3);
  const topThreeMetropolitan = metropolitan.slice(0, 3);
  const topThreePacific = pacific.slice(0, 3);

  const teamsQualified = useMemo(
    // All qualified Teams
    () =>
      [
        ...topThreeCentral,
        ...topThreeAtlantic,
        ...topThreeMetropolitan,
        ...topThreePacific,
      ].map((team) => team.teamName.default),
    [topThreeCentral, topThreeAtlantic, topThreeMetropolitan, topThreePacific]
  );

  const EasternWildCards = useMemo(
    // Qualified Teams from the East
    () =>
      eastern.filter((team) => !teamsQualified.includes(team.teamName.default)),
    [eastern, teamsQualified]
  );

  const WesternWildCards = useMemo(
    // Qualified Teams from the West
    () =>
      western.filter((team) => !teamsQualified.includes(team.teamName.default)),
    [western, teamsQualified]
  );

  const [qualifiedCentral, setQualifiedCentral] = useState<StandingsTableType>({
    // Qualified Teams from Central
    standings: topThreeCentral,
    sortedBy: "Points",
  });
  const [qualifiedAtlantic, setQualifiedAtlantic] =
    useState<StandingsTableType>(
      // Qualified Teams from Atlantic
      {
        standings: topThreeAtlantic,
        sortedBy: "Points",
      }
    );

  // States
  const [qualifiedMetropolitan, setQualifiedMetropolitan] =
    useState<StandingsTableType>({
      standings: topThreeMetropolitan,
      sortedBy: "Points",
    });
  const [qualifiedPacific, setQualifiedPacific] = useState<StandingsTableType>({
    standings: topThreePacific,
    sortedBy: "Points",
  });
  const [unqualifiedWest, setUnqualifiedWest] = useState<StandingsTableType>({
    standings: WesternWildCards,
    sortedBy: "Points",
  });
  const [unqualifiedEast, setUnqualifiedEast] = useState<StandingsTableType>({
    standings: EasternWildCards,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      // Sort newStandings by sortBy argument
      let stateSetter: Dispatch<SetStateAction<StandingsTableType>> | undefined;
      switch (argument) {
        // Set which state is to be updated
        case "Central":
          stateSetter = setQualifiedCentral;
          break;
        case "Atlantic":
          stateSetter = setQualifiedAtlantic;
          break;
        case "Metropolitan":
          stateSetter = setQualifiedMetropolitan;
          break;
        case "Pacific":
          stateSetter = setQualifiedPacific;
          break;
        case "Western":
          stateSetter = setUnqualifiedWest;
          break;
        case "Eastern":
          stateSetter = setUnqualifiedEast;
          break;
        default:
          throw new Error(`Invalid argument: ${argument}`);
      }
      startViewTransitionWrapper(() =>
        // Set selected state to the new sorted standings
        stateSetter((prevState) =>
          prevState.sortedBy === sortBy
            ? reverseStandings(prevState)
            : { standings: newStandings, sortedBy: sortBy }
        )
      );
    },
    [
      setQualifiedCentral,
      setQualifiedAtlantic,
      setQualifiedMetropolitan,
      setQualifiedPacific,
      setUnqualifiedWest,
      setUnqualifiedEast,
    ]
  );

  return (
    <>
      <StyledTable
        standings={qualifiedAtlantic.standings}
        tableName={"Atlantic"}
        aria-label="Atlantic Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={qualifiedMetropolitan.standings}
        tableName={"Metropolitan"}
        aria-label="Metropolitan Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={unqualifiedEast.standings}
        tableName={"Eastern"}
        aria-label="Eastern Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />

      <StyledTable
        standings={qualifiedCentral.standings}
        tableName={"Central"}
        aria-label="Central Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={qualifiedPacific.standings}
        tableName={"Pacific"}
        aria-label="Pacific Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={unqualifiedWest.standings}
        tableName={"Western"}
        aria-label="Western Division Wild Card Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default WildCardTable;
