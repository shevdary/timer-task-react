import React, { Component } from "react";
import "./Timer.css";
import { Button, Box, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";

import store from "../../store";
const { dispatch } = store;

const { stopTimer, startTimer, addNewTask } = bindActionCreators(
  actions,
  dispatch
);

class Timer extends Component {
  state = {
    isActiveTimer: false
  };

  onClick = () => {
    const { isActiveTimer } = this.state;
    isActiveTimer ? this.timerStop() : this.timerStart();
    this.setState({ isActiveTimer: !isActiveTimer });
  };

  timerStart = () => {
    this.timer();
  };

  timer = () => {
    this.interval = setInterval(startTimer, 1000);
  };

  timerStop = () => {
    const { onAddedToList } = this.props;
    clearInterval(this.interval);
    stopTimer();
    onAddedToList({ id: 2 });
  };

  render() {
    const { currentTime } = this.props;
    const { isActiveTimer } = this.state;

    const minutes = currentTime ? Math.trunc((currentTime / 60) % 60) : 0;
    const hours =
      minutes == null ? 0 : Math.trunc((currentTime / 60 / 60) % 60);
    const second = currentTime > 60 ? currentTime % 60 : currentTime;

    return (
      <Container className="container">
        <TextField id="standard-basic" label="Name of your task" />
        <Box borderRadius="50%" boxShadow={5} className="Box">
          {hours + ":" + minutes + ":" + second}
        </Box>
        <Button variant="contained" onClick={this.onClick} className="button">
          {isActiveTimer ? "stop" : "start"}
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime,
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddedToList: object => dispatch(addNewTask(object))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
