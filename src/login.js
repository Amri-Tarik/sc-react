import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#354e6b",
      main: "#052640",
      dark: "#00001a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffa652",
      main: "#f47521",
      dark: "#bb4600",
      contrastText: "#000",
    },
  },
});

class Login extends Component {
  state = {
    error: false,
    username: "",
    password: "",
  };
  render() {
    const send_data = (e) => {
      e.preventDefault();
      axios
        .post("https://SC-replit.uraveragegeek.repl.co", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          this.setState(res.data);
          if (!res.data.error) {
            console.log(res.data);
            this.props.logged(
              res.data.role + " " + this.state.username,
              res.data.scribe
            );
          }
        });
    };
    return (
      <div
        style={{
          height: "200px",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <form onSubmit={send_data}>
          <Grid container>
            <Grid item xs={1} md={4}></Grid>
            <Grid item xs={10} md={4}>
              <Paper style={{ backgroundColor: "#354e6b" }}>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  spacing={6}
                >
                  <ThemeProvider theme={theme}>
                    <Grid item xs={12}>
                      {this.state.error ? (
                        <span style={{ color: "red", fontSize: "1em" }}>
                          Wrong credentials, try again
                        </span>
                      ) : (
                        <span style={{ fontSize: "1.5em" }}>
                          Please enter your credentials :
                        </span>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => {
                          this.setState({ username: e.target.value });
                        }}
                        label="Username"
                        color="secondary"
                        error={this.state.error ? true : false}
                        style={{ color: "white", transform: "scale(1.5)" }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        onChange={(e) => {
                          this.setState({ password: e.target.value });
                        }}
                        style={{ color: "white", transform: "scale(1.5)" }}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        color="secondary"
                        error={this.state.error ? true : false}
                      />
                    </Grid>
                    {/* <Grid item xs={12}></Grid> */}
                    <Grid item xs={12}>
                      <Button
                        size="large"
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Login
                      </Button>
                    </Grid>
                  </ThemeProvider>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Login;
