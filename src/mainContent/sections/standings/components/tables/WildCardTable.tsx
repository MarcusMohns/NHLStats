import type { TeamType } from "../../store.tsx";
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

type WildCardTablePropTypes = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  western: TeamType[];
  eastern: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedTable: string;
};
type WildCardStateType = {
  standings: TeamType[];
  sortedBy: String;
};

const WildCardTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  western,
  eastern,
  headers,
  selectedTable,
}: WildCardTablePropTypes) => {
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
    [central, atlantic, metropolitan, pacific]
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

  const [qualifiedCentral, setQualifiedCentral] = useState<WildCardStateType>({
    // Qualified Teams from Central
    standings: topThreeCentral,
    sortedBy: "Points",
  });
  const [qualifiedAtlantic, setQualifiedAtlantic] = useState<WildCardStateType>(
    // Qualified Teams from Atlantic
    {
      standings: topThreeAtlantic,
      sortedBy: "Points",
    }
  );

  // States
  const [qualifiedMetropolitan, setQualifiedMetropolitan] =
    useState<WildCardStateType>({
      standings: topThreeMetropolitan,
      sortedBy: "Points",
    });
  const [qualifiedPacific, setQualifiedPacific] = useState<WildCardStateType>({
    standings: topThreePacific,
    sortedBy: "Points",
  });
  const [unqualifiedWest, setUnqualifiedWest] = useState<WildCardStateType>({
    standings: WesternWildCards,
    sortedBy: "Points",
  });
  const [unqualifiedEast, setUnqualifiedEast] = useState<WildCardStateType>({
    standings: EasternWildCards,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      // Sort newStandings by sortBy argument
      let stateSetter: Dispatch<SetStateAction<WildCardStateType>> | undefined;
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
      reverseStandings,
      setQualifiedCentral,
      setQualifiedAtlantic,
      setQualifiedMetropolitan,
      setQualifiedPacific,
      setUnqualifiedWest,
      setUnqualifiedEast,
    ]
  );

  const tableProps = {
    handleSort,
    headers,
    selectedTable,
  };

  return (
    <>
      <StyledTable
        standings={qualifiedAtlantic.standings}
        tableName={"Atlantic"}
        {...tableProps}
      />
      <StyledTable
        standings={qualifiedMetropolitan.standings}
        tableName={"Metropolitan"}
        {...tableProps}
      />
      <StyledTable
        standings={unqualifiedEast.standings}
        tableName={"Eastern"}
        {...tableProps}
      />

      <StyledTable
        standings={qualifiedCentral.standings}
        tableName={"Central"}
        {...tableProps}
      />
      <StyledTable
        standings={qualifiedPacific.standings}
        tableName={"Pacific"}
        {...tableProps}
      />
      <StyledTable
        standings={unqualifiedWest.standings}
        tableName={"Western"}
        {...tableProps}
      />
    </>
  );
};

export default WildCardTable;
