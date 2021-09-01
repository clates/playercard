import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import PlayerCard from "./PlayerCard/PlayerCard";
import Loading from "./Loading/Loading";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamsFilter, setTeamsFilter] = useState('');
  const [playerNameFilter, setPlayerNameFilter] = useState('');

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

  
  return (
    <>
      {teams.length && players.length ? (
        <>
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 p-10">
            <select onChange={x => setTeamsFilter(x.target.value)} class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option key={""} value={""}>All Teams</option>
              {
                teams
                  .sort((a, b) => a.ta > b.ta ? 1 : -1 )
                  .map(x => <option key={x.ta} value={x.ta}>{`${x.city} ${x.name}`}</option>)
              }
            </select>
            <div class="relative text-gray-600">
              <input type="search" onChange={x => setPlayerNameFilter(x.target.value.split())} placeholder="Search players..." class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full">
              </input>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 p-10">
            {players
            .filter(player => (!teamsFilter || player.ta === teamsFilter))
            .filter(player => (!playerNameFilter || player.fn.toLowerCase().includes(playerNameFilter) || player.ln.toLowerCase().includes(playerNameFilter)))
            .map((x) => (
              <PlayerCard
                key={x.slug}
                team={teams.filter((team) => team.ta === x.ta)[0]}
                {...x}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-screen h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}
