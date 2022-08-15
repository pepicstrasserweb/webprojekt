import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./DriverCardCollapse.css";
import Button from "@mui/material/Button";
import axios from "axios";

import { useRecoilState } from "recoil";
import { reloadDriversTrigger, tokenState, userVotedState, authState } from "../../recoil/atoms";

const DriverCardCollapse = (props) => {
  const [reloadTrigger, setReloadTrigger] =
    useRecoilState(reloadDriversTrigger);

  const [token, setToken] = useRecoilState(tokenState);
  const [userVoted, setUserVoted] = useRecoilState(userVotedState);
  const [authenticated, setAuthenticated] = useRecoilState(authState);

  const voteForDriver = () => {
    axios
      .get(`/driver/${props.driverId}/vote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>  {setReloadTrigger(true); setUserVoted(true)})
      .catch((err) => alert(err.response.data.error));
  };

  const retractVote = () => {
    axios
      .get(`/driver/${props.driverId}/retractVote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {setReloadTrigger(true); setUserVoted(false)})
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div className="driver-card-collapse">
      <CardContent className="driver-card-collapse__content">
        <Typography variant="h7">Country: {props.country}</Typography>
        <Typography variant="h7">Team: {props.team}</Typography>
        <Typography variant="h7">Date of birth: {props.dob}</Typography>
        <Typography variant="h7">Grands Prix entered: {props.gpEntered}</Typography>
        <Typography variant="h7">Podiums: {props.podiums}</Typography>
      </CardContent>
      {props.usersVote === props.driverId || userVoted ? null : (
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#d50000",
            margin: "10px",
            padding: "9px 18px",
            fontSize: "18px",
          }}
          type="submit"
          variant="contained"
          className="login-button"
          onClick={() => voteForDriver()}
          disabled={!authenticated}
        >
          Vote
        </Button>
      )}

      {props.usersVote === props.driverId ? (
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#d50000",
            margin: "10px",
            padding: "9px 18px",
            fontSize: "18px",
          }}
          type="submit"
          variant="contained"
          className="login-button"
          onClick={() => retractVote()}
        >
          Retract vote
        </Button>
      ) : null}
    </div>
  );
};

export default DriverCardCollapse;
