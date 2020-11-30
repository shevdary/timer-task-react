import React, { Component } from "react";
import Timer from "../Timer/Timer";
import TaskTab from "../TasksTab/TaskTab";
import { connect } from "react-redux";
import store from "../../store";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
const { dispatch } = store;

const { onLoad } = bindActionCreators(actions, dispatch);

class MainPage extends Component {
  state = {
    load: false,
    stateTimer: 0
  };
  componentWillMount() {
    const { isActiveTimer } = this.state;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.load === true) {
      localStorage.setItem("load", "true");
      setInterval(() => {}, 1000);
    }
  }
  render() {
    return (
      <div>
        <Timer />
        <TaskTab props={this.props.props} />
      </div>
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
    onUpdate: onLoad
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
