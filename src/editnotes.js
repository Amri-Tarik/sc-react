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

class EditNotes extends Component {
  state = {
    search: "",
    wingman: "",
    searched: false,
    notes: "",
    noted: false,
  };
  render() {
    const send_data = (e) => {
      e.preventDefault();
      axios
        .post("https://SC-replit.uraveragegeek.repl.co/notes", {
          username: this.state.search,
        })
        .then((res) => {
          if (res.data.notes != null) {
            this.setState({
              notes: res.data.notes,
              searched: true,
              wingman: this.state.search,
              noted: false,
            });
          } else {
            this.setState({
              notes: "",
              searched: true,
              wingman: this.state.search,
              noted: false,
            });
          }
        });
    };
    const submit_notes = (e) => {
      e.preventDefault();
      axios
        .post("https://SC-replit.uraveragegeek.repl.co/editnotes", {
          username: this.state.wingman,
          notes: this.state.notes,
        })
        .then(() => {
          this.setState({ noted: true });
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
          <form onSubmit={submit_notes}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  value={this.state.notes}
                  onChange={(e) => {
                    this.setState({ notes: e.target.value });
                  }}
                  variant="outlined"
                  label="notes"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button
                  size="large"
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </form>
        ) : (
          <span></span>
        )}
        {this.state.noted ? (
          <Grid item>
            {" "}
            <span style={{ color: "green", fontSize: "1em" }}>
              notes saved successfully
            </span>
          </Grid>
        ) : (
          <span></span>
        )}
      </Grid>
    );
  }
}

export default EditNotes;
