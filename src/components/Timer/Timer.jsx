import React, { Component } from "react";
import "./Timer.css";
import { Button, Box, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../actions/TimerActions";

import store from "../../store";
const {dispatch}=store;

const {stopTimer,startTimer} = bindActionCreators( actions, dispatch);


class Timer extends Component {
  state = {
    isActiveTimer: false
  };

  onClick = () => {
    const { isActiveTimer } = this.state;
    isActiveTimer ? this.stop() : this.start();
    this.setState({ isActiveTimer: !isActiveTimer });
  };

  start = () => {
    this.timer();
  };

  timer = () => {
    this.interval = setInterval(
      startTimer,
      1000
    );
  };

  stop = () => {
    clearInterval(this.interval);
    stopTimer();
  };

  render() {
    let { currentTime } = this.props;
    const { isActiveTimer } = this.state;
    console.log(isActiveTimer, "a");
    const minutes = currentTime ? Math.trunc(currentTime / 60) : 0;
    const hours = minutes == null ? 0 : Math.trunc(minutes / 60);
    const second = currentTime > 60 ? 0 : currentTime;
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
    currentTime: state.currentTime
  };
};
const mapDispatchToProps=dispatch=>{
    return{

    }
}

export default connect(mapStateToProps)(Timer);
