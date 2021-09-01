import { useEffect, useState, useMemo } from "react";
import styles from "../styles/Home.module.css";
import PlayerCard from "./PlayerCard/PlayerCard";
import Loading from "./Loading/Loading";
import Select from "react-select";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamsFilter, setTeamsFilter] = useState("ALL");
  const [playerNameFilter, setPlayerNameFilter] = useState("");

  useEffect(() => {
    fetchPlayerData();
    fetchTeamData();
  }, []);

  const fetchPlayerData = () => {
    fetch("api/players", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPlayers(json);
      });
  };

  const fetchTeamData = () => {
    fetch("api/teams", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setTeams(json);
      });
  };

  let filteredPlayerCards = useMemo(
    () =>
      players
        .filter((player) => teamsFilter === "ALL" || player.ta === teamsFilter)
        .filter(
          (player) =>
            !playerNameFilter ||
            player.fn.toLowerCase().includes(playerNameFilter) ||
            player.ln.toLowerCase().includes(playerNameFilter)
        )
        .map((x) => (
          <PlayerCard
            key={x.slug}
            team={teams.filter((team) => team.ta === x.ta)[0]}
            {...x}
          />
        )),
    [players, teamsFilter, playerNameFilter, teams]
  );

  const generateLabelForTeam = ({ city, name, logo }) => {
    return (
      <div className="flex h-8 items-center align-content-center">
        <img className="h-full pr-4" src={logo} />
        <div className="align-middle">
          {city} {name}
        </div>
      </div>
    );
  };

  let teamOptions = [
    {
      value: "ALL",
      label: generateLabelForTeam({
        city: "All",
        name: "Teams",
        logo: "https://cdn.nba.com/logos/leagues/logo-nba.svg",
      }),
    },
    ...teams
      .sort((a, b) => (a.ta > b.ta ? 1 : -1))
      .map((x) => ({ value: x.ta, label: generateLabelForTeam(x) })),
  ];

  return (
    <>
      {teams.length && players.length ? (
        <>
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 p-10">
            <Select
              placeholder="Search teams..."
              defaultValue={teamOptions[0]}
              onChange={(selected) => setTeamsFilter(selected.value)}
              options={teamOptions}
            />
            <input
              type="search"
              onChange={(x) => setPlayerNameFilter(x.target.value.split())}
              placeholder="Search players..."
              className="border border-gray-300 rounded-full text-gray-600 w-full h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            ></input>
          </div>
          {filteredPlayerCards.length ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 p-10">
              {filteredPlayerCards}
            </div>
          ) : (
            <div className="text-center p-10 text-xl font-extrabold w-full">
              No players match the criteria above.
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-screen h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}
