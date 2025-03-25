import { GoalieType } from "./TeamStatsModal";

const Puck = (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000 scale-1/2"
    className="h-6 w-6"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <title>hockey_puck</title>{" "}
      <path d="M12,5C6.5,5,2,6.6,2,8.5S6.5,12,12,12s10-1.6,10-3.5S17.5,5,12,5M2,11.8v4.7C2,18.4,6.5,20,12,20s10-1.6,10-3.5V11.8a8.17,8.17,0,0,1-2.3,1.1A25.06,25.06,0,0,1,12,14a25.06,25.06,0,0,1-7.7-1.1A12.29,12.29,0,0,1,2,11.8Z"></path>{" "}
      <rect width="24" height="24" fill="none"></rect>{" "}
    </g>
  </svg>
);

const GoalieCard = ({ player }: { player: GoalieType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full w-24 h-24">
      <img
        className="max-w-20 max-h-20 rounded-full bg-gray-300 shadow-md"
        src={player.headshot}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-center w-full text-md text-gray-900 uppercase font-bold mb-2">
          {player.firstName.default} {player.lastName.default}{" "}
        </div>
        <div className="flex ml-12 flex-row flex-wrap font-medium ">
          <div className="flex mx-5">
            {Puck} Save %:{player.savePercentage.toFixed(2)}
          </div>
          <div className="flex mx-5">
            🥅 GA avg: {player.goalsAgainstAverage.toFixed(2)}
          </div>
          <div className="flex mx-5">🧤 Saves: {player.saves} </div>
          <div className="flex mx-5">🏒 SA: {player.shotsAgainst}</div>
        </div>
      </div>
    </div>
  );
};

export default GoalieCard;
