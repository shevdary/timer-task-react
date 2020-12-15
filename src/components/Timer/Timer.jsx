import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import {
  stopTimer,
  tickTimer,
  updateTimer,
  startTimer,
} from '../../redux/reducers/timer';
import { updateTasks, addNewTask } from '../../redux/reducers/tasks';
// components
import { AlertDialog } from '../AlertWindow/AlertDialogInfo';
// style
import './Timer.css';
// material-ui
import { Box, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { StyleButton } from '../../material/customStyles';
// utils
import { isDifferenceInTime, unixToTime } from '../../utils/unixToTime';
import moment from 'moment';
import {
  clearStorage,
  getDataFromStorage,
  getTimerFromStorage,
  setStorageTimer,
  setTasksStorage,
} from '../../utils/localStorage';

class Timer extends Component {
  state = {
    taskName: '',
    isActiveTimer: false,
    isError: false,
    timeIsLoad: new Date().toLocaleTimeString(),
    timerStart: 0,
  };

  componentDidMount() {
    const { updateTasks } = this.props;
    window.addEventListener('beforeunload', () => {
      const { isStartTime, tasks } = this.props;
      if (isStartTime != 0) {
        setStorageTimer(isStartTime);
      }

      if (!getDataFromStorage()) {
        setTasksStorage(tasks);
      }
    });

    if (getTimerFromStorage()) {
      this.setState({ isActiveTimer: true });
      this.handleUpdate();
    }

    if (getDataFromStorage()) {
      updateTasks(getDataFromStorage());
    }
  }

  componentDidUpdate(prevProps) {
    const { tasks } = this.props;

    if (prevProps.tasks.tasks != tasks) {
      updateTasks(tasks);
      setTasksStorage(tasks);
      return true;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', () => {
      const { isStartTime, tasks } = this.props;

      if (isStartTime != 0) {
        setStorageTimer(isStartTime);
      }

      if (!getDataFromStorage()) {
        setTasksStorage(tasks);
      }
    });
  }

  handleUpdate = () => {
    const { tickTimer, updateTimer } = this.props;
    const { timeIsLoad } = this.state;
    const timerLoad = isDifferenceInTime(timeIsLoad, getTimerFromStorage());
    this.timeInterval = setInterval(tickTimer, 1000);
    updateTimer(timerLoad);
  };

  handleClick = () => {
    const { isActiveTimer, taskName } = this.state;

    if (isActiveTimer) {
      taskName ? this.handleStopTimer() : this.setState({ isError: true });
    }

    if (!isActiveTimer) {
      this.handleStartTimer();
    }
  };

  handleChange = (e) => {
    this.setState({ taskName: e.target.value });
  };

  handleStartTimer = () => {
    const { tickTimer, startTimer } = this.props;
    this.setState({ isActiveTimer: true });
    setStorageTimer(0);
    startTimer();
    this.interval = setInterval(tickTimer, 1000);
  };

  onClearInterval = () => {
    clearStorage();
    clearInterval(this.interval);
    clearInterval(this.timeInterval);
  };

  handleStopTimer = () => {
    const { taskName } = this.state;
    const { stopTimer, addNewTask, currentTime } = this.props;

    const stopTime = moment().format('HH:mm:ss');
    const startTime = isDifferenceInTime(stopTime, unixToTime(currentTime));
    const data = {
      name: taskName,
      startTime: unixToTime(startTime),
      durationTime: unixToTime(currentTime),
      endTime: stopTime,
    };

    addNewTask(data);
    stopTimer();
    this.onClearInterval();
    this.setState({ taskName: '', isActiveTimer: false });
  };

  handleCloseError = () => {
    this.setState({ isError: false });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, taskName, isError } = this.state;
    const isTimerValue = unixToTime(currentTime);
    return (
      <Box className="container" m={2}>
        <TextField
          id="standard-basic"
          label="Name of your task"
          onChange={this.handleChange}
          value={taskName}
        />
        <Box borderRadius="50%" boxShadow={5} className="Box">
          <Typography color="primary" variant="h4">
            {isTimerValue}
          </Typography>
        </Box>
        <StyleButton
          color="primary"
          onClick={this.handleClick}
          className="button"
        >
          {isActiveTimer ? 'stop' : 'start'}
        </StyleButton>
        <AlertDialog open={isError} handleClose={this.handleCloseError} />
      </Box>
    );
  }
}

export default connect(
  ({ tasks: { tasks }, timer: { currentTime, isStartTime } }) => ({
    tasks,
    currentTime,
    isStartTime,
  }),
  {
    addNewTask,
    updateTasks,
    tickTimer,
    startTimer,
    updateTimer,
    stopTimer,
  }
)(Timer);
