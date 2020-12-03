import React, { Component } from "react";
import { StyleButton } from "../../helperStyle/customStyles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../reducers/actions";
import store from "../../store";
//helpers
import { isDifferenceTime, unixToTime } from "../../helpers/unixToTime";
const { dispatch } = store;
const { onUpdateList } = bindActionCreators(actions, dispatch);

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
    const difference = isDifferenceTime(endTime, durationTime);
    const startTime = unixToTime(difference);
    return { startTime, endTime, durationTime };
  };

  onClick = () => {
    const { onUpdateTasks } = this.props;
    const { data } = this.state;
    this.onGenerateId();
    this.onGenerateName();
    this.onGenerateTime();
    onUpdateTasks(data);
    this.setState({
      isClick: true
    });
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
    tasks: state.tasks
  };
};
const mapDispatchToProps = () => {
  return {
    onUpdateTasks: tasks => onUpdateList(tasks)
  };
};

export default connect(mapStateToProps,mapDispatchToProps )(ButtonGenerate);