import React, { Component } from 'react';
import { StyleButton } from '../../material/customStyles';
//redux
import { connect } from 'react-redux';
import store from '../../redux/store';
const { dispatch } = store;
import * as actions from '../../redux/reducers/tasks';
import { bindActionCreators } from 'redux';
const { cleanTasks, addNewTask } = bindActionCreators(actions, dispatch);
//utils
import { isDifferenceInTime, unixToTime } from '../../utils/unixToTime';

class GenerateButton extends Component {
  state = {
    data: [],
    isClick: false,
  };

  onGenerateId = () => {
    const { data } = this.state;
    const date = data;
    for (let id = 1; id <= 10; id++) {
      const { startTime, endTime, durationTime } = this.onGenerateTime();
      date.push({
        name: this.onGenerateName(),
        startTime: startTime,
        endTime: endTime,
        durationTime: durationTime,
      });
    }
    this.setState({
      data: date,
    });
  };

  onGenerateName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
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

  onGenerate = () => {
    this.onGenerateId();
    this.onGenerateName();
    this.onGenerateTime();
  };

  onClick = () => {
    const { onAddNewTasks, onClearList } = this.props;
    const { data } = this.state;
    this.setState({
      isClick: true,
    });
    onClearList();
    this.onGenerate();
    data.forEach(item => onAddNewTasks(item));
    location.reload();
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
    tasks: state.tasksReducer.tasks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddNewTasks: tasksList => {
      addNewTask(tasksList);
    },
    onClearList: () => {
      cleanTasks();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateButton);
