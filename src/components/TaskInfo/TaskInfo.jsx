import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
// components
import TaskInfoUndefined from './TaskInfoUndefined';
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
// other
import { themeInfo } from '../../material/customTheme';

const TaskInfo = ({ tasks }) => {
  const { id } = useParams();
  const history = useHistory();
  const info = tasks.find((item) => item.id === Number(id));

  if (!info) {
    return <TaskInfoUndefined />;
  }

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="sm"
      onClose={() => history.goBack()}
      fullWidth={true}
    >
      <ThemeProvider theme={themeInfo}>
        <DialogTitle id="customized-dialog-title">
          <DoneAllIcon style={{ color: green[500] }} />
          {info.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>ID: {info.id}</Typography>
          <Typography gutterBottom>Time start : {info.startTime}</Typography>
          <Typography gutterBottom>Time end : {info.endTime}</Typography>
          <Typography gutterBottom>Time spend : {info.durationTime}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon /> Back
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
};

export default connect(({ tasks: { tasks } }) => ({
  tasks,
}))(TaskInfo);
