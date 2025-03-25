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
import startViewTransitionWrapper from "../../utility/startViewTransitionWrapper";

type WildCardTablePropTypes = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  western: TeamType[];
  eastern: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedStandings: string;
  handleOpenModal: (team: TeamType) => void;
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
  handleOpenModal,
}: WildCardTablePropTypes) => {
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
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
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
      startViewTransitionWrapper(() =>
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
    selectedStandings,
    handleOpenModal,
  };

  return (
    <>
      <StyledTable
        standings={unqualifiedEast.standings}
        tableName={"Eastern"}
        {...tableProps}
      />
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
        standings={unqualifiedWest.standings}
        tableName={"Western"}
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
    </>
  );
};

export default WildCardTable;
