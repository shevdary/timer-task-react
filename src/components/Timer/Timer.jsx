import React, { Component } from "react";
import "./Timer.css";
import { Button, Box, Container, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
import store from "../../store";
import { createBrowserHistory } from "history";
import { AlertDialog } from "../ErrorBoundary/ErrorBoundary";
import { countTime } from "../../reducers/countTime";

const { dispatch } = store;
const { startTimer, addNewTask } = bindActionCreators(actions, dispatch);

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      isActiveTimer: false,
      name: null,
      open: false,
      stateTimer: 0
    };
  }

  componentDidMount() {
    const history = createBrowserHistory();
    const { isActiveTimer } = this.state;
    history.push("/tab-log");
    setInterval(() => {
      this.setState({ stateTimer: Number(localStorage.getItem("count")) });
    }, 1000);
    if (localStorage.getItem("load") == "true") {
      this.setState({ isActiveTimer: !isActiveTimer });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tasks != this.props.tasks) {
      const { tasks } = this.props;
      const mass = [];
      if (localStorage.getItem("tasksData") != null) {
        JSON.parse(localStorage.getItem("tasksData")).forEach(item =>
          mass.push(item)
        );
        if (!prevProps.tasks[0]) {
          tasks.forEach(item => mass.push(item));
          localStorage.setItem("tasksData", JSON.stringify(mass));
        }
        if (prevProps.tasks[0]) {
          const getLastId = tasks[0] ? tasks[tasks.length - 1].id : 0;
          let timer = countTime(Number(localStorage.getItem("count")));
          let newA = {
            id: getLastId,
            timeStart: timer.date,
            timeEnd: timer.timeEnd,
            name: tasks[tasks.length - 1].name,
            timeSpend: timer.countTime
          };

          mass.push(newA);
          localStorage.setItem("tasksData", JSON.stringify(mass));
        }
      }
      if (localStorage.getItem("tasksData") == null) {
        localStorage.setItem("tasksData", JSON.stringify(tasks));
      }
    }
  }

  onClick = () => {
    const { isActiveTimer } = this.state;
    if (isActiveTimer) {
      if (this.state.name === null) {
        this.setState({ open: true });
      }
      this.timerStop();
    }
    if (!isActiveTimer) {
      this.timerStart();
      this.setState({ isActiveTimer: !isActiveTimer });
    }
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  timerStart = () => {
    this.interval = setInterval(startTimer, 1000);
  };

  timerStop = () => {
    const { onAddedToList } = this.props;
    const { name, isActiveTimer } = this.state;
    if (name === null || name == "") {
      this.setState({ open: true });
    }
    if (name !== null && name != "") {
      clearInterval(this.interval);
      onAddedToList(name);
      localStorage.removeItem("count");
      localStorage.removeItem("load");
      this.setState({ name: "", isActiveTimer: !isActiveTimer });
    }
  };

  closeError = () => {
    this.setState({ open: false });
  };
  getCurrentTime = seconds => {
    let minutes = 0,
      hours = 0,
      second = 0;
    minutes = seconds ? Math.trunc((seconds / 60) % 60) : 0;
    hours = minutes == null ? 0 : Math.trunc((seconds / 60 / 60) % 60);
    second = seconds > 60 ? seconds % 60 : seconds;
    return { minutes, hours, second };
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, name } = this.state;
    const storage = localStorage.getItem("load");
    const timerStorage = Number(localStorage.getItem("count"));
    let minutes = 0,
      hours = 0,
      second = 0;
    if (storage === "true") {
      const time = this.getCurrentTime(timerStorage);
      minutes = time.minutes;
      hours = time.hours;
      second = time.second;
    }
    if (currentTime != 0) {
      const time = this.getCurrentTime(currentTime);
      minutes = time.minutes;
      hours = time.hours;
      second = time.second;
    }

    return (
      <Container className="container">
        <TextField
          id="standard-basic"
          label="Name of your task"
          onChange={this.onChange}
          value={name}
        />
        <Box borderRadius="50%" boxShadow={5} className="Box">
          {`${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${second < 10 ? "0" + second : second}`}
        </Box>
        <Button variant="contained" onClick={this.onClick} className="button">
          {isActiveTimer ? "stop" : "start"}
        </Button>
        <AlertDialog open={this.state.open} handleClose={this.closeError} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime,
    isLoad: state.isLoad,
    ...state
  };
};


const mapDispatchToProps = () => {
  return {
    onAddedToList: addNewTask
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
