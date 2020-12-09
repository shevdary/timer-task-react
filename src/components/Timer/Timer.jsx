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
} from '../../localStorage';

class Timer extends Component {
  state = {
    name: '',
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
      this.onUpdate();
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

  onUpdate = () => {
    const { tickTimer, updateTimer } = this.props;
    const { timeIsLoad } = this.state;
    const timerLoad = isDifferenceInTime(timeIsLoad, getTimerFromStorage());
    this.timeInterval = setInterval(tickTimer, 1000);
    updateTimer(timerLoad);
  };

  onClick = () => {
    const { isActiveTimer, name } = this.state;

    if (isActiveTimer) {
      name ? this.onStopTimer() : this.setState({ isError: true });
    }

    if (!isActiveTimer) {
      this.onStartTimer();
    }
  };

  onChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onStartTimer = () => {
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

  onStopTimer = () => {
    const { name } = this.state;
    const { stopTimer, addNewTask, currentTime } = this.props;

    const stopTime = moment().format('HH:mm:ss');
    const startTime = isDifferenceInTime(stopTime, unixToTime(currentTime));
    const data = {
      name: name,
      startTime: unixToTime(startTime),
      durationTime: unixToTime(currentTime),
      endTime: stopTime,
    };

    addNewTask(data);
    stopTimer();
    this.onClearInterval();
    this.setState({ name: '', isActiveTimer: false });
  };

  onCloseError = () => {
    this.setState({ isError: false });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, name } = this.state;
    const isTimerValue = unixToTime(currentTime);
    return (
      <Box className="container" m={2}>
        <TextField
          id="standard-basic"
          label="Name of your task"
          onChange={this.onChange}
          value={name}
        />
        <Box borderRadius="50%" boxShadow={5} className="Box">
          <Typography color="primary" variant="h4">
            {isTimerValue}
          </Typography>
        </Box>
        <StyleButton color="primary" onClick={this.onClick} className="button">
          {isActiveTimer ? 'stop' : 'start'}
        </StyleButton>
        <AlertDialog
          open={this.state.isError}
          handleClose={this.onCloseError}
        />
      </Box>
    );
  }
}

const mapStateToProps = ({
  tasks: { tasks },
  timer: { currentTime, isStartTime },
}) => {
  return {
    tasks,
    currentTime,
    isStartTime,
  };
};

export default connect(mapStateToProps, {
  addNewTask,
  updateTasks,
  tickTimer,
  startTimer,
  updateTimer,
  stopTimer,
})(Timer);
