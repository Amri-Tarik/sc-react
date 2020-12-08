import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

class ChgPass extends Component {
  state = {
    succes: false,
    error: false,
    matching: true,
    password: "",
    new_pass: "",
    conf_pass: "",
  };
  render() {
    const send_data = (e) => {
      e.preventDefault();
      if (this.state.new_pass !== this.state.conf_pass) {
        this.setState({ matching: false });
      } else {
        this.setState({ matching: true });
        axios
          .post("https://SC-replit.uraveragegeek.repl.co/chg", {
            username: this.props.username,
            password: this.state.password,
            new_pass: this.state.new_pass,
          })
          .then((res) => {
            this.setState(res.data);
            if (!res.data.error) {
              this.setState({
                succes: true,
              });
            }
          });
      }
    };
    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        spacing={6}
      >
        <form onSubmit={send_data}>
          <Grid item xs={12}>
            <br />
            {this.state.succes ? (
              <span style={{ color: "green", fontSize: "1em" }}>
                {" "}
                password changed successfully
                <br />
              </span>
            ) : (
              <span style={{ fontSize: "1.5em" }}>
                Please fill the details :
                <br />
              </span>
            )}
            {this.state.error ? (
              <span style={{ color: "red", fontSize: "1em" }}>
                Wrong password, try again
                <br />
              </span>
            ) : (
              <span></span>
            )}
            {this.state.matching ? (
              <span></span>
            ) : (
              <span style={{ color: "red", fontSize: "1em" }}>
                new passwords not matchin
              </span>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              style={{ color: "white", transform: "scale(1.5)" }}
              label="Old password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              error={this.state.error ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <br />
            <TextField
              onChange={(e) => {
                this.setState({ new_pass: e.target.value });
              }}
              style={{ color: "white", transform: "scale(1.5)" }}
              label="New password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              error={this.state.error ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <br />
            <TextField
              onChange={(e) => {
                this.setState({ conf_pass: e.target.value });
              }}
              style={{ color: "white", transform: "scale(1.5)" }}
              label="confirm password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              error={this.state.error ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <br />
            <br />
            <Button
              size="large"
              type="submit"
              color="secondary"
              variant="contained"
            >
              Login
            </Button>
            <br />
            <br />
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default ChgPass;
