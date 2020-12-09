import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChgPass from "./chg_pass";
import Notes from "./notes";
import EditNotes from "./editnotes";
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

class Main extends Component {
  state = { value: 0, sqd_size: "loading" };
  componentDidMount() {
    axios.post("https://SC-replit.uraveragegeek.repl.co/sqd").then((res) => {
      this.setState({ sqd_size: res.data });
    });
  }
  render() {
    const TabPanel = (props) => {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography component={"span"}>{children}</Typography>
            </Box>
          )}
        </div>
      );
    };
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
      console.log(this.props.scribe);
    };
    return (
      <div
        style={{
          height: "300px",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={10} md={10}>
              <Paper style={{ backgroundColor: "#354e6b" }}>
                <AppBar position="static">
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={this.state.value}
                    onChange={handleChange}
                  >
                    <Tab label="Dashboard" value={0} />
                    <Tab label="View wingmen data" value={1} />
                    <Tab
                      label={
                        this.props.scribe
                          ? "Edit wingmen data"
                          : "Edit wingmen data (scribes only)"
                      }
                      value={2}
                      disabled={!this.props.scribe}
                    />
                    <Tab label="Change password" value={3} />
                  </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                  <Typography variant="h6">
                    Squadron size :{" "}
                    <span style={{ color: "#f47521" }}>
                      {this.state.sqd_size}
                    </span>
                  </Typography>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  <Notes />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                  <EditNotes />
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                  <ChgPass username={this.props.username} />
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}

export default Main;
