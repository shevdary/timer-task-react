import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
//material-ui
import {
  Typography,
  Button,
  Dialog,
  ThemeProvider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import green from '@material-ui/core/colors/green';
//helper
import { themeInfo } from '../../material/customTheme';
import TaskInfoUndefined from './TaskInfoUndefined';
import { getDataFromStorage } from '../../localStorage';
//history
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

class TaskInfo extends Component {
  render() {
    const { tasksId, tasks } = this.props;
    let info = tasks.find(item => item.id == tasksId);
    if (info == undefined) {
      info = getDataFromStorage().find(item => item.id == tasksId);
    }
    const details =
      info == undefined ? (
        <TaskInfoUndefined />
      ) : (
        <div>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={true}
            maxWidth="sm"
            fullWidth={true}
          >
            <ThemeProvider theme={themeInfo}>
              <DialogTitle id="customized-dialog-title">
                <DoneAllIcon style={{ color: green[500] }} />
                {info.name}
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>ID: {info.id}</Typography>
                <Typography gutterBottom>
                  Time start : {info.startTime}
                </Typography>
                <Typography gutterBottom>Time end : {info.endTime}</Typography>
                <Typography gutterBottom>
                  Time spend : {info.durationTime}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => history.back()}
                >
                  <ArrowBackIcon /> Back
                </Button>
              </DialogActions>
            </ThemeProvider>
          </Dialog>
        </div>
      );
    return <div>{details}</div>;
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasksReducer.tasks };
};
export default connect(mapStateToProps)(TaskInfo);