import React, { Component } from "react";
import { StyleButton } from "../../helperStyle/customStyles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import store from "../../redux/store";
//helpers
import { isDifferenceInTime, unixToTime } from "../../helpers/unixToTime";
import {cleanTasks, updateTasks} from "../../redux/reducers/tasks";
const { dispatch } = store;


class ButtonGenerate extends Component {
  state = {
    data: [],
    isClick: false
  };

  onGenerateId = () => {
    const { data } = this.state;
    const date = data;
    for (let id = 1; id <= 10; id++) {
      const { startTime, endTime, durationTime } = this.onGenerateTime();
      date.push({
        id: id,
        name: this.onGenerateName(),
        startTime: startTime,
        endTime: endTime,
        spendTime: durationTime
      });
    }
    this.setState({
      data: date
    });
  };

  onGenerateName = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let name = "";
    for (let i = 0; i < 5; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return name;
  };
  onGenerateTime = () => {
    const randomTime = Math.trunc(Math.random() * (5400 - 600 + 1) + 600);
    const randomEnd = Math.trunc(Math.random() * (86400 + 1));
    const durationTime = unixToTime(randomTime);
    const endTime = unixToTime(randomEnd);
    const difference = isDifferenceInTime(endTime, durationTime);
    const startTime = unixToTime(difference);
    return { startTime, endTime, durationTime };
  };

  onClick = () => {
    const { onUpdateTasks,onClearList } = this.props;
    const { data } = this.state;
    this.setState({
      isClick: true
    });
    onClearList();
    this.onGenerateId();
    this.onGenerateName();
    this.onGenerateTime();
    onUpdateTasks(data);

  };
  render() {
    return (
        <div>
          <StyleButton onClick={this.onClick}>generate</StyleButton>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasksReducer.tasks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateTasks: tasks => {dispatch(updateTasks(tasks))},
    onClearList:()=>{dispatch(cleanTasks())}
  };
};

export default connect(mapStateToProps,mapDispatchToProps )(ButtonGenerate);