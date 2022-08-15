import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import F1Logo from "../images/f1-logo.png";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { useRecoilState } from 'recoil';
import { authState, tokenState } from '../recoil/atoms';


const StyledInput = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-notchedOutline {
    border-color: black;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: red;
  }
`;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", error: "", password: "" });


  const [authenticated, setAuthenticated] = useRecoilState(authState);
  const [token, setToken] = useRecoilState(tokenState);


  const history = useHistory();

  let handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    axios
      .post("/signup", newUserData)
      .then((res) => {
        setToken(res.data.token);
        setAuthenticated(true)
        console.log(res.data);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(email, password, errors);
  });

  let handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  let handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  let handleConfirmPasswordInput = (event) => {
    setConfirmPassword(event.target.value);
  };

  let handleHandleInput = (event) => {
    setHandle(event.target.value);
  };



  return (
    <Grid container>
      <Grid item xs={1} sm={3} md={4} />
      <Grid item xs={10} sm={6} md={4}>
        <img className="login-logo" height={100} src={F1Logo} alt="logo" />
        <Typography marginBottom={"20px"} variant="h3">
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <StyledInput
            InputLabelProps={{
              style: { color: "#000" },
            }}
            id="email"
            name="email"
            type="email"
            label="Email"
            className="login-textField"
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleEmailInput}
            fullWidth
          ></StyledInput>

          <StyledInput
            InputLabelProps={{
              style: { color: "#000" },
            }}
            id="password"
            name="password"
            type="password"
            label="Password"
            className="login-textField"
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handlePasswordInput}
            fullWidth
          ></StyledInput>

          <StyledInput
            InputLabelProps={{
              style: { color: "#000" },
            }}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            className="login-textField"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleConfirmPasswordInput}
            fullWidth
          ></StyledInput>

          <StyledInput
            InputLabelProps={{
              style: { color: "#000" },
            }}
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className="login-textField"
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleHandleInput}
            fullWidth
          ></StyledInput>

          {errors.error && (
            <Typography margin="2px" color="#d50000" variant="body2">
              {errors.error}
            </Typography>
          )}
          {errors.general && (
            <Typography margin="2px" color="#d50000" variant="body2">
              {errors.general}
            </Typography>
          )}

          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#d50000",
              margin: "5px",
              padding: "9px 18px",
              fontSize: "18px",
            }}
            type="submit"
            variant="contained"
            className="login-button"
            disabled={loading}
          >
            Signupu
            {loading && (
              <CircularProgress
                style={{ color: "white", position: "absolute" }}
              ></CircularProgress>
            )}
          </Button>
          <br />
          <small>
            Already have an account ? Login{" "}
            <Link
              style={{ color: "#d50000", textDecoration: "none" }}
              to="/login"
            >
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item xs={1} sm={3} md={4} />
    </Grid>
  );
};

export default Signup;
