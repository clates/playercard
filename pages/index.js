import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import PlayerCard from "./PlayerCard/PlayerCard";
import Loading from "./Loading/Loading";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 p-10">
            {players.map((x) => (
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
