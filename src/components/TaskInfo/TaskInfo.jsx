import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Chip,
  Divider,
  Button,
  makeStyles
} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  }
}));
const TaskInfo = props => {
  const { tasksId, tasks } = props;
  const classes = useStyles();
  const info = tasks.find(item => item.id == tasksId);
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                {info.name}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1"></Typography>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              time spend : {info.timeSpend}
            </Typography>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1"></Typography>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              time start : {info.timeStart}
            </Typography>
          </Grid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { tasks: state.tasks };
};
export default connect(mapStateToProps)(TaskInfo); {/*   */}