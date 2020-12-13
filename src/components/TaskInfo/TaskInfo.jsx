import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';

// material-ui
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

// utils
import { themeInfo } from '../../material/customTheme';
import TaskInfoUndefined from './TaskInfoUndefined';
import { getDataFromStorage } from '../../utils/localStorage';

// history
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const TaskInfo = ({ tasks }) => {
  const tasksId = useParams().id;
  let info = tasks.find((item) => item.id == tasksId);
  if (info == undefined) {
    info = getDataFromStorage().find((item) => item.id == tasksId);
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
          onClose={() => history.back()}
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
};

export default connect(({ tasks: { tasks } }) => ({
  tasks,
}))(TaskInfo);