import "./App.css";

import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

//Pages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";

//Auth
import Navbar from "./components/UI/Navbar";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

import { useEffect } from "react";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { authState, tokenState, currentUserState } from "./recoil/atoms";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d50000",
    },
    secondary: {
      main: "#b71c1c",
    },
    typography: {
      useNextVariants: true,
    },
  },
});

function App() {
  const [token, setToken] = useRecoilState(tokenState);

  const [authenticated, setAuthenticated] = useRecoilState(authState);

  

  useEffect(() => { 
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        setAuthenticated(false);
        
        console.log("user not authnticated");
      } else {
        setAuthenticated(true);
        console.log("user authnticated");
      }
    }
  });

  useEffect(() => {
    console.log(authenticated, token);
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route color="inherit" exact path="/" component={Home} />
              <Route color="inherit" exact path="/login" component={Login} />
              <Route color="inherit" exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
