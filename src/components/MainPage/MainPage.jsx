import React, { Component } from "react";
import Timer from "../Timer/Timer";
import TasksLog from "../TasksLog/TasksLog";
import TaskTab from "../TasksTab/TaskTab";
import { connect } from "react-redux";
import store from "../../store";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/TimerActions";
const { dispatch } = store;

const { startTimer, addNewTask, onAfkTimer } = bindActionCreators(
  actions,
  dispatch
);

class MainPage extends Component {
  state = {
    load: false
  };
  componentDidMount() {
    setInterval(() => {
      this.onLoad();
    }, 1000);
    window.addEventListener("beforeunload", () => {
      if (this.props.isLoad == true) {
        this.setState({ load: true });
      }
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.load === true) {
      localStorage.setItem("load", "true");
      setInterval(() => {
        let storage = localStorage.getItem("count");
        localStorage.setItem("count", storage + 1);
      }, 1000);
    }
  }
  onLoad = () => {
    let countFromStorage = localStorage.getItem("count");
    if (localStorage.getItem("load") == "true") {
      localStorage.setItem("count", Number(countFromStorage) + 1);
    }
    if (this.props.isLoad == true) {
      this.onLoadStorage(this.props.currentTime);
    }
  };
  onLoadStorage = timer => {
    localStorage.setItem("count", Number(timer) + 1);
  };

  render() {
    return (
      <div>
        <Timer />
        <TaskTab />
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
export default connect(mapStateToProps)(MainPage);
