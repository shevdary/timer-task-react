import React, { Component } from "react";
import "./Timer.css";
import { Button, Box, Container, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
import store from "../../store";
import { createBrowserHistory } from "history";
import { AlertDialog } from "../ErrorBoundary/ErrorBoundary";

const { dispatch } = store;
const { startTimer, addNewTask } = bindActionCreators(
  actions,
  dispatch
);

class Timer extends Component {
  state = {
    isActiveTimer: false,
    name: null,
    open: false
  };
  componentDidMount() {
    const history = createBrowserHistory();
    history.push("/tab-log");
  }

  onClick = () => {
    const { isActiveTimer } = this.state;
    if (isActiveTimer) {
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
    const { name, open, isActiveTimer } = this.state;
    if (name === null) {
      this.setState({ open: true });
    }
    if (name !== null) {
      clearInterval(this.interval);
      localStorage.clear();
      onAddedToList(name);
      this.setState({ name: "", isActiveTimer: !isActiveTimer });
    }
  };

  closeError = () => {
    this.setState({ open: false });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer, name } = this.state;
    const minutes = currentTime ? Math.trunc((currentTime / 60) % 60) : 0;
    const hours =
      minutes == null ? 0 : Math.trunc((currentTime / 60 / 60) % 60);
    const second = currentTime > 60 ? currentTime % 60 : currentTime;

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
    isLoad: state.isLoad
  };
};

const mapDispatchToProps = () => {
  return {
    onAddedToList: addNewTask
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
