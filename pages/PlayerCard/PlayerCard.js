import { useState } from "react";

export default function PlayerCard({
  pid,
  ln,
  fn,
  ta,
  num,
  pos,
  pts,
  reb,
  ast,
  stl,
  headshot,
  slug,
  team,
}) {
  const [isError, setError] = useState(false);
  const FALLBACK_URL =
    "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201571.png";
  return (
    <div className="relative overflow-hidden shadow-lg">
      <div className="absolute inset-0">
        <img
          style={{ filter: "grayscale(1)" }}
          className="absolute h-96 -top-24 -left-10 opacity-5"
          src={team.logo}
        />
        <img
          className="absolute h-12 top-2 right-2 opacity-100 "
          src={team.logo}
        />
      </div>
      <div className="relative">
        <div className="divide-y-4">
          <div className="relative grid grid-cols-2 mt-3">
            {isError ? (
              <img
                style={{ filter: "blur(10px) grayscale(1)" }}
                src={FALLBACK_URL}
              />
            ) : (
              <img src={headshot} onError={() => setError(true)} />
            )}
            <div className="flex justify-center flex-col m-0">
              <p className="text-gray-500">
                #{num} | {pos}
              </p>
              <h1 className="text-xl font-extrabold">{fn}</h1>
              <h1 className="text-xl font-extrabold">{ln}</h1>
            </div>
          </div>
          <div style={{ borderColor: team.color }} className="bg-white">
            <div className="grid grid-flow-col auto-cols-auto text-center divide-x-2">
              <div className="p-3">
                <div className="text-lg -mb-1 -mt-1">PPG</div>
                <div className="text-2xl font-bold">{pts || "N/A"}</div>
              </div>
              <div className="p-3">
                <p className="text-lg -mb-1 -mt-1">RPG</p>
                <p className="text-2xl font-bold">{reb || "N/A"}</p>
              </div>
              <div className="p-3">
                <p className="text-lg -mb-1 -mt-1">APG</p>
                <p className="text-2xl font-bold">{ast || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
