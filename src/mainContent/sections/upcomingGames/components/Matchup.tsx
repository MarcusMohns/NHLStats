import LinkOut from "../../../components/LinkOut";

type MatchupProps = {
  homeTeamAbbrev: string;
  homeTeamLogo: string;
  homeTeamDarkLogo: string;
  awayTeamAbbrev: string;
  awayTeamLogo: string;
  awayTeamDarkLogo: string;
  gameCenterLink: string;
};

const Matchup = ({
  homeTeamAbbrev,
  homeTeamLogo,
  homeTeamDarkLogo,
  awayTeamAbbrev,
  awayTeamLogo,
  awayTeamDarkLogo,
  gameCenterLink,
}: MatchupProps) => {
  return (
    <div className="flex flex-row items-center justify-center align-center dark:text-stone-300  text-stone-800 w-full flex-space-between font-bold">
      <p className="flex flex-row items-center justify-center min-w-20">
        {awayTeamAbbrev}
        <img className="w-8 h-8 dark:hidden" src={awayTeamLogo} />
        <img className="w-8 h-8 hidden dark:block" src={awayTeamDarkLogo} />
      </p>
      <p className="w-5">vs</p>
      <p className="flex flex-row items-center justify-center min-w-20">
        <img className="w-8 h-8 dark:hidden" src={homeTeamLogo} />
        <img className="w-8 h-8 hidden dark:block" src={homeTeamDarkLogo} />
        {homeTeamAbbrev}
      </p>
      <LinkOut
        linkOutStyles="flex items-center h-full"
        hrefString={`https://www.nhl.com${gameCenterLink}`}
      />
    </div>
  );
};

export default Matchup;
