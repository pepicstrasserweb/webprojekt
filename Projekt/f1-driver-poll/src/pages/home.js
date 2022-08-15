import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverCard from "../components/Drivers/DriverCard";
import { useRecoilState } from "recoil";
import {
  driversState,
  reloadDriversTrigger,
  usersVoteState,
  tokenState,
  userVotedState,
  authState,
  currentUserState
} from "../recoil/atoms";
import { PieChart } from "react-minimal-pie-chart";
import { fontSize } from "@mui/system";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

const Home = () => {
  const [drivers, setDrivers] = useRecoilState(driversState);

  const [reloadTrigger, setReloadTrigger] =
    useRecoilState(reloadDriversTrigger);

  const [usersVote, setUsersVote] = useRecoilState(usersVoteState);

  const [token, setToken] = useRecoilState(tokenState);

  const [userVoted, setUserVoted] = useRecoilState(userVotedState);

  const [totalVotes, setTotalVotes] = useState(false);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  // Get
  useEffect(() => {
    axios
      .get("/usersVote", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setUsersVote("Not voted");
          setUserVoted(false);
        } else {
          setUsersVote(res.data[0].driverId);
          setUserVoted(true);
        }
      })
      .catch((err) => console.log(err));
  }, [token, reloadTrigger]);

  useEffect(() => console.log(usersVote));

  useEffect(() => {
    axios
      .get("/drivers")
      .then((res) => {
        setDrivers(res.data);
        setReloadTrigger(false);
        console.log(res);

        let totalNumVotes = 0;
        res.data.forEach((driver) => {
          totalNumVotes += driver.voteCount;
        });

        setTotalVotes(totalNumVotes);
      })
      .catch((err) => console.log(err));
  }, [reloadTrigger]); // [] dodano jer u suprotnom se get zahtjev neprestano ponavlja


  useEffect(() => {
    axios
      .get("/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setCurrentUser(false)
        } else {
          setCurrentUser(res.data[0].handle);
        }
      })
      .catch((err) => console.log(err));
  }, [token, reloadTrigger]);

  let driverList = drivers ? (
    drivers.map((driver) => (
      <DriverCard
        key={driver.driverId}
        driverId={driver.driverId}
        name={driver.name}
        team={driver.team}
        driverImg={driver.driverImg}
        flag={driver.flag}
        country={driver.country}
        voteCount={driver.voteCount}
        dob={driver.dob}
        gpEntered={driver.gpEntered}
        podiums={driver.podiums}
        usersVote={usersVote}
      />
    ))
  ) : (
    <p>Loading...</p>
  );

  let pieChart = drivers ? (
    <div style={{ margin: 20 }}>
      <Card style={{ backgroundColor: "#d50000" }}>
        <Typography style={{ color: "white" }} variant="h4">Current voting results</Typography>
      </Card>

      <PieChart
        lineWidth={30}
        style={{ height: "500px" }}
        viewBoxSize={[120, 120]}
        center={[60, 60]}
        radius="40"
        data={[
          { title: drivers[0].name, value: drivers[0].voteCount, color: "#d50000"},
          {
            title: drivers[1].name,
            value: drivers[1].voteCount,
            color: "gray",
          },
          {
            title: drivers[2].name,
            value: drivers[2].voteCount,
            color: "white",
          },
          {
            title: "Others",
            value:
              totalVotes -
              (drivers[0].voteCount +
                drivers[1].voteCount +
                drivers[2].voteCount),

            color: "black",
          },
        ]}
        label={({ dataEntry }) =>
          dataEntry.title + " " + Math.round(dataEntry.percentage) + "%"
        }
        labelPosition={115}
        labelStyle={{ fontSize: "5px", fill: "white" }}
      />
    </div>
  ) : null;

  return (
    <div>
      {driverList}
      <br></br>

      <div>{pieChart}</div>
    </div>
  );
};

export default Home;
