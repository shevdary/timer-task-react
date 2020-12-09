import React, { Component } from 'react';
import { StyleButtonGenerate } from '../../material/customStyles';

// redux
import { connect } from 'react-redux';
import store from '../../redux/store';
import * as actions from '../../redux/reducers/tasks';
import { bindActionCreators } from 'redux';
const { dispatch } = store;
const { cleanTasks, addNewTask } = bindActionCreators(actions, dispatch);

// utils
import { unixToTime } from '../../utils/unixToTime';
import moment from 'moment';
import faker from 'faker';

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
    const name = faker.lorem.sentence();
    return name;
  };

  onGenerateTime = () => {
    const { data } = this.state;
    let startTime, endTime;
    const randomGap = Math.trunc(Math.random() * (5400 - 300 + 1) + 300);
    const randomTime = Math.trunc(Math.random() * (5400 - 600 + 1) + 600);
    const durationTime = unixToTime(randomTime);
    if (!data[0]) {
      const randomStart = Math.trunc(Math.random() * (86400 + 1));
      endTime = unixToTime(randomTime + randomStart);
      startTime = unixToTime(randomStart);
    }

    if (data[0]) {
      const getLastEndTime = moment
        .duration(data[data.length - 1].endTime)
        .asSeconds();
      const nextStartTime = moment
        .duration(randomGap + getLastEndTime, 's')
        .asSeconds();
      startTime = unixToTime(nextStartTime);
      endTime = unixToTime(randomTime + nextStartTime);
    }
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
    data.forEach((item) => onAddNewTasks(item));
    location.reload();
  };
  render() {
    return (
      <div>
        <StyleButtonGenerate onClick={this.onClick} m={3}>
          generate
        </StyleButtonGenerate>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks: { tasks } }) => ({
  tasks,
});

const mapDispatchToProps = () => {
  return {
    onAddNewTasks: (tasksList) => {
      addNewTask(tasksList);
    },
    onClearList: () => {
      cleanTasks();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateButton);
