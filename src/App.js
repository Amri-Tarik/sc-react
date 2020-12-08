import { Component } from "react";
import "./App.css";
import Login from "./login";
import Main from "./main_screen";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    logged: false,
    username: "",
    rank: "",
    scribe: false,
  };
  render() {
    const logstate = (role, username, scribe) => {
      this.setState({
        logged: true,
        username: username,
        scribe: scribe,
        rank: role,
      });
      console.log(scribe);
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
            <Typography
              component={"span"}
              variant="h5"
              style={{ color: "white" }}
            >
              <b>
                {this.state.logged ? (
                  <span>
                    Welcome{" "}
                    <span style={{ color: "#f47521" }}>
                      {this.state.rank + " " + this.state.username}
                    </span>{" "}
                    o7
                  </span>
                ) : (
                  <span>Please log in, CMDR </span>
                )}
              </b>
            </Typography>
          </Paper>
        </AppBar>
        {this.state.logged ? (
          <Main scribe={this.state.scribe} username={this.state.username} />
        ) : (
          <Login
            logged={(role, username, scribe) =>
              logstate(role, username, scribe)
            }
          />
        )}
      </div>
    );
  }
}

export default App;
