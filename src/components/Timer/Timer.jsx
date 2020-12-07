import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import {
  stopTimer,
  tickTimer,
  updateTimer,
  startTimer,
} from '../../redux/reducers/timer';
import { updateTasks, addNewTask } from '../../redux/reducers/tasks';

//components
import { AlertDialog } from '../AlertWindow/AlertDialogInfo';

//style
import './Timer.css';

//material-ui
import { Box, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { StyleButton } from '../../material/customStyles';

//utils
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
    timeIsLoad: 0,
    timerStart: 0,
  };

  componentWillMount() {
    this.setState({ timeIsLoad: new Date().toLocaleTimeString() });
  }

  componentDidMount() {
    const { onUpdateTasks } = this.props;
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
      onUpdateTasks(getDataFromStorage());
    }
  }

  componentWillUnmount() {
    window.addEventListener('beforeunload', () => {
      const { isStartTime, tasks } = this.props;

      if (isStartTime != 0) {
        setStorageTimer(isStartTime);
      }

      if (!getDataFromStorage()) {
        setTasksStorage(tasks);
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { tasks } = this.props;

    if (prevProps.tasks.tasks != tasks) {
      updateTasks(tasks);
      setTasksStorage(tasks);
      return true;
    }
  }

  onUpdate = () => {
    const { onTickTimer, onUpdateTimer } = this.props;
    const { timeIsLoad } = this.state;
    const timerLoad = isDifferenceInTime(timeIsLoad, getTimerFromStorage());
    this.timeInterval = setInterval(onTickTimer, 1000);
    onUpdateTimer(timerLoad);
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

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  onStartTimer = () => {
    const { onTickTimer, onStartTimer } = this.props;
    this.setState({ isActiveTimer: true });
    setStorageTimer(0);
    onStartTimer();
    this.interval = setInterval(onTickTimer, 1000);
  };

  onClearInterval = () => {
    clearStorage();
    clearInterval(this.interval);
    clearInterval(this.timeInterval);
  };

  onStopTimer = () => {
    const { name } = this.state;
    const { onStopTimer, onAddNewTask, currentTime } = this.props;

    const stopTime = moment().format('HH:mm:ss');
    const startTime = isDifferenceInTime(stopTime, unixToTime(currentTime));
    const data = {
      name: name,
      startTime: unixToTime(startTime),
      durationTime: unixToTime(currentTime),
      endTime: stopTime,
    };

    onAddNewTask(data);
    onStopTimer();
    this.onClearInterval();
    this.setState({ name: '', isActiveTimer: false });
  };

  onCloseError = () => {
    this.setState({ isError: false });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, name, timeIsLoad } = this.state;
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
const mapDispatchToProps = dispatch => {
  return {
    onStopTimer: () => {
      dispatch(stopTimer());
    },
    onUpdateTimer: time => {
      dispatch(updateTimer(time));
    },
    onStartTimer: tasks => {
      dispatch(startTimer());
    },

    onTickTimer: () => {
      dispatch(tickTimer());
    },

    onUpdateTasks: tasks => {
      dispatch(updateTasks(tasks));
    },
    onAddNewTask: data => {
      dispatch(addNewTask(data));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
