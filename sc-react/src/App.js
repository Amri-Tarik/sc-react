import { Component } from "react";
import "./App.css";
import Login from "./login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    logged: false,
    username: "",
  };
  render() {
    const logstate = (username) => {
      this.setState({ logged: true, username: username });
    };
    return (
      <div className="App">
        <AppBar style={{ backgroundColor: "#052640" }} position="sticky">
          <Toolbar>
            <Grid container>
              <Grid item md={4}></Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="banner.png"
                  alt="Second chances"
                  height="80vh"
                  style={{ padding: "10px" }}
                ></img>
              </Grid>
            </Grid>
          </Toolbar>
          <Paper
            style={{
              backgroundColor: "#354e6b",
              padding: "10px",
            }}
          >
            <Typography variant="h5" style={{ color: "white" }}>
              <b>
                {this.state.logged ? (
                  <span>Welcome {this.state.username}</span>
                ) : (
                  <span>Please log in, CMDR </span>
                )}
              </b>
            </Typography>
          </Paper>
        </AppBar>
        {this.state.logged ? (
          <span />
        ) : (
          <Login logged={(username) => logstate(username)} />
        )}
      </div>
    );
  }
}

export default App;
