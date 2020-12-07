import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
  state = {
    value: 0,
    squadron_size: 0,
  };
  constructor(props) {
    super(props);
    var currentTime = new Date();
    let data = {
      header: {
        appName: "Second Chances DashBoard",
        appVersion: "0.1",
        isDeveloped: true,
        APIkey: "5eehd7sxejok04s4g0k0gwwg8wgwokk8k0ock4w",
        commanderName: "PEPEGA_OVERLORD",
        commanderFrontierID: "b3l488p",
      },
      events: [
        {
          eventCustomID: 13458,
          eventName: "getCommanderProfile",
          eventTimestamp: currentTime.toISOString(),
          eventData: {
            searchName: "PEPEGA_OVERLORD",
          },
        },
      ],
    };
    axios
      .post("https://inara.cz/inapi/v1/", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
              <Typography>{children}</Typography>
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
          height: "200px",
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
                    variant="fullWidth"
                    value={this.state.value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
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
                  </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                  <span>Squadron size : {this.state.squadron_size}</span>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                  Item Three
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
