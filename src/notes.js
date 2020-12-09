import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
// import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const wingmen = [
  "SargonTheSwitch",
  "Michael Erik Holdar",
  "pepega overlord",
  "Ender",
  "theredbutton731",
];

class Notes extends Component {
  state = {
    search: "",
    searched: false,
    notes: "none\n\n\n",
    sqd_rank: "loading...",
    allegiance: "loading...",
    power: "loading...",
    inaraURL: "loading...",
    found: true,
  };
  render() {
    const send_data = (e) => {
      e.preventDefault();
      console.log(this.state.search);
      axios
        .post("https://SC-replit.uraveragegeek.repl.co/cmdr", {
          username: this.state.search,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({
            allegiance: res.data.allegience,
            sqd_rank: res.data.rank,
            power: res.data.power,
            inaraURL: res.data.inaraURL,
          });
        });
      axios
        .post("https://SC-replit.uraveragegeek.repl.co/notes", {
          username: this.state.search,
        })
        .then((res) => {
          if (res.data.notes != null) {
            this.setState({
              notes: res.data.notes,
              searched: true,
            });
          } else {
            this.setState({
              notes: "none",
              searched: true,
            });
          }
        });
    };
    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <form onSubmit={send_data}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item md={2}></Grid>
              <Grid item xs={8} md={5}>
                <Autocomplete
                  onChange={(e, newValue) => {
                    this.setState({ search: newValue });
                  }}
                  options={wingmen}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="search"
                      color="secondary"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} md={2}>
                <Button
                  size="large"
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Search
                </Button>
              </Grid>
              <Grid item md={2} />
            </Grid>
          </form>
        </Grid>
        {this.state.searched ? (
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  focused
                  value={this.state.sqd_rank}
                  variant="outlined"
                  label="Squadron rank"
                  color="secondary"
                />
              </Grid>
              <Grid item md={2} />
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  focused
                  value={this.state.allegiance}
                  variant="outlined"
                  label="Allegiance"
                  color="secondary"
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <span></span>
        )}
        {this.state.searched ? (
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  focused
                  value={this.state.power}
                  variant="outlined"
                  label="Power"
                  color="secondary"
                />
              </Grid>
              <Grid item md={2} />
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  focused
                  value={this.state.inaraURL}
                  variant="outlined"
                  label="inara URL"
                  color="secondary"
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <span></span>
        )}
        {this.state.searched ? (
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              focused
              value={this.state.notes}
              variant="outlined"
              label="notes by the scribes"
              color="secondary"
            />
          </Grid>
        ) : (
          <span></span>
        )}
      </Grid>
    );
  }
}
export default Notes;
