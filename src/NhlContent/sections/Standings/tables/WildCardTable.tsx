import { TeamType } from "../Standings";
import { reverseStandings, sortFunctions } from "../../utility/sortFunctions";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useMemo,
} from "react";
import StyledTable from "../components/StyledTable";

type WildCardTableProps = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  western: TeamType[];
  eastern: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedStandings: string;
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
  selectedStandings,
}: WildCardTableProps) => {
  const topThreeCentral = central.slice(0, 3);
  const topThreeAtlantic = atlantic.slice(0, 3);
  const topThreeMetropolitan = metropolitan.slice(0, 3);
  const topThreePacific = pacific.slice(0, 3);

  const teamsQualified = useMemo(
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
    () =>
      eastern.filter((team) => !teamsQualified.includes(team.teamName.default)),
    [eastern, teamsQualified]
  );

  const WesternWildCards = useMemo(
    () =>
      western.filter((team) => !teamsQualified.includes(team.teamName.default)),
    [western, teamsQualified]
  );

  const [qualifiedCentral, setQualifiedCentral] = useState<WildCardStateType>({
    standings: topThreeCentral,
    sortedBy: "Points",
  });
  const [qualifiedAtlantic, setQualifiedAtlantic] = useState<WildCardStateType>(
    {
      standings: topThreeAtlantic,
      sortedBy: "Points",
    }
  );
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
    (argument: string, oldStandings: TeamType[], sortBy: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      let stateSetter: Dispatch<SetStateAction<WildCardStateType>> | undefined;
      switch (argument) {
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
      stateSetter((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
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

  return (
    <>
      <StyledTable
        standings={unqualifiedEast.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Eastern"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={qualifiedAtlantic.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Atlantic"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={qualifiedMetropolitan.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Metropolitan"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={unqualifiedWest.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Western"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={qualifiedCentral.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Central"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={qualifiedPacific.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Pacific"}
        selectedStandings={selectedStandings}
      />
    </>
  );
};

export default WildCardTable;
