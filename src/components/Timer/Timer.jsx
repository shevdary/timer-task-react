import React, { Component } from "react";
//style
import "./Timer.css";
import { StyleButton } from "../../helperStyle/customStyles";
//material-ui
import { Box, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../reducers/actions";
import store from "../../store";
//helpers
import { AlertDialog } from "../AlertWindow/AlertDialogInfo";
import { isDifferenceTime, unixToTime } from "../../helpers/unixToTime";
import moment from "moment";
import {
  clearStorage,
  getDataFromStorage,
  getTimerFromStorage,
  setStorageTimer,
  setTasksStorage
} from "../../localStorage";


const { dispatch } = store;
const {
  startTimer,
  tickTimer,
  addNewTask,
  onUpdateTimer,
  onUpdateList
} = bindActionCreators(actions, dispatch);

class Timer extends Component {
  state = {
    taskName: "",
    isActiveTimer: false,
    isError: false,
    timeIsLoad: 0,
    timerStart:0
  };

  componentWillMount() {
    this.setState({ timeIsLoad: new Date().toLocaleTimeString() });
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      const { isStartTime, tasks,currentTime } = this.props;
      if (currentTime) {
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
      this.props.onUpdateTasks(getDataFromStorage());
    }
  }
  componentWillUnmount() {
    window.addEventListener("beforeunload", () => {
      const { isStartTime, tasks,currentTime } = this.props;
      if (currentTime) {
        setStorageTimer(isStartTime);
      }
      if (!getDataFromStorage()) {
        setTasksStorage(tasks);
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tasks != this.props.tasks) {
      return true;
    }
  }

  onUpdate = () => {
    const { onUpdateTimer } = this.props;
    const { timeIsLoad } = this.state;
    const timerLoad = isDifferenceTime(timeIsLoad, getTimerFromStorage());
    this.timeInterval = setInterval(tickTimer, 1000);
    onUpdateTimer(timerLoad);
  };

  onClick = () => {
    const { isActiveTimer,taskName } = this.state;
    if (isActiveTimer) {
      taskName ? this.ontimerStop() : this.setState({ isError: true });
    }
    if (!isActiveTimer) {
      this.ontimerStart();
    }
  };

  onChange = e => {
    this.setState({ taskName: e.target.value });
  };

  ontimerStart = () => {
    this.setState({ isActiveTimer: true });
    setStorageTimer(0);
    startTimer();
    this.interval = setInterval(tickTimer, 1000);
  };

  ontimerStop = () => {
    const { onAddedToList } = this.props;
    const { taskName } = this.state;
    clearStorage();
    clearInterval(this.interval);
    clearInterval(this.timeInterval);
    onAddedToList(taskName);
    this.setState({ taskName: "", isActiveTimer: false });
  };
  closeError = () => {
    this.setState({ isError: false });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, taskName, timeIsLoad } = this.state;
    const isTimerValue = unixToTime(currentTime);
    return (
        <Box className="container" m={2}>
          <TextField
              id="standard-basic"
              label="Name of your task"
              onChange={this.onChange}
              value={taskName}
          />
          <Box borderRadius="50%" boxShadow={5} className="Box">
            <Typography color="primary" variant="h4">
              {isTimerValue}
            </Typography>
          </Box>
          <StyleButton color="primary" onClick={this.onClick} className="button">
            {isActiveTimer ? "stop" : "start"}
          </StyleButton>
          <AlertDialog open={this.state.isError} handleClose={this.closeError} />
        </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime,
    isLoad: state.isLoad,
    tasks: state.tasks,
    ...state
  };
};

const mapDispatchToProps = () => {
  return {
    onAddedToList: addNewTask,
    onUpdateTimer: time => onUpdateTimer(time),
    onUpdateTickTimer: startTimer,
    onUpdateTasks: tasks => onUpdateList(tasks)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
