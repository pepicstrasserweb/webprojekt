import React from "react";
import { Link } from "react-router-dom";
import F1Logo from "../../images/f1-logo-2.png";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { authState, tokenState, currentUserState } from "../../recoil/atoms";
import { Typography } from "@mui/material";

function Navbar(props) {
  const [authenticated, setAuthenticated] = useRecoilState(authState);
  const [token, setToken] = useRecoilState(tokenState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  return (
    <AppBar
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Toolbar style={{ justifyContent: "space-between" }} >
        <img src={F1Logo} alt="logo" style={{ width: 100 }} />
        {authenticated ? null : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {authenticated ? null : (
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        )}
        {authenticated ? (
          <Button
            color="inherit"
            onClick={() => {
              setAuthenticated(false);
              setCurrentUser(false);
              setToken(false);
            }}
            component={Link}
            to="/login"
          >
            Logout
          </Button>
        ) : null}
      </Toolbar>
      {currentUser ? <Typography style={{marginRight:10}}>Welcome, {currentUser}!</Typography> : null}
    </AppBar>
  );
}

export default Navbar;
