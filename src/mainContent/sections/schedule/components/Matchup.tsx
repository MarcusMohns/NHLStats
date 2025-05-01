type MatchupProps = {
  homeTeamAbbrev: string;
  homeTeamLogo: string;
  homeTeamDarkLogo: string;
  homeTeamScore?: number;
  awayTeamAbbrev: string;
  awayTeamLogo: string;
  awayTeamDarkLogo: string;
  awayTeamScore?: number;
};

const Matchup = ({
  homeTeamAbbrev,
  homeTeamLogo,
  homeTeamDarkLogo,
  homeTeamScore,
  awayTeamAbbrev,
  awayTeamLogo,
  awayTeamDarkLogo,
  awayTeamScore,
}: MatchupProps) => {
  return (
    <div className="flex flex-row items-center justify-center align-center dark:text-stone-300  text-stone-800 w-full flex-space-between font-bold">
      <p className="flex flex-row items-center justify-center min-w-20">
        {awayTeamAbbrev}
        <img
          className="w-8 h-8 md:w-12 md:h-12 dark:hidden"
          src={awayTeamLogo}
        />
        <img
          className="w-8 h-8 md:w-12 md:h-12 hidden dark:block"
          src={awayTeamDarkLogo}
        />
        {awayTeamScore}
      </p>
      <p className="w-5 mx-1">vs</p>
      {homeTeamScore}
      <p className="flex flex-row items-center justify-center min-w-20">
        <img
          className="w-8 h-8 md:w-12 md:h-12 dark:hidden"
          src={homeTeamLogo}
        />
        <img
          className="w-8 h-8 md:w-12 md:h-12 hidden dark:block"
          src={homeTeamDarkLogo}
        />
        {homeTeamAbbrev}
      </p>
    </div>
  );
};

export default Matchup;
