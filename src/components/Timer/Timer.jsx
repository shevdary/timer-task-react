import React, { Component } from "react";
import "./Timer.css";
import { Button, Box, Container,TextField  } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";

import store from "../../store";
import {createBrowserHistory} from "history";
const { dispatch } = store;

const { startTimer, addNewTask } = bindActionCreators(actions, dispatch);

class Timer extends Component {
  state = {
    isActiveTimer: false,
    name: ""
  };
  componentDidMount(){

    const history = createBrowserHistory();
    history.push("/tab-log");

  }
  onClick = () => {
    const { isActiveTimer } = this.state;
    isActiveTimer ? this.timerStop() : this.timerStart();
    this.setState({ isActiveTimer: !isActiveTimer });

  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  timerStart = () => {
    this.timer();

  };

  timer = () => {
    this.interval = setInterval(startTimer, 1000);
  };

  timerStop = () => {
    const { onAddedToList } = this.props;
    const { name } = this.state;
    clearInterval(this.interval);
    onAddedToList(name);
    this.setState({ name: "" });
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
const mapDispatchToProps = dispatch => {
  return {
    onAddedToList:addNewTask,
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
