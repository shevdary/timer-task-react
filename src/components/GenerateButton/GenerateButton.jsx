import React, { Component } from 'react';
import { StyleButtonGenerate } from '../../material/customStyles';
// redux
import { connect, useDispatch } from 'react-redux';
// utils
import { unixToTime } from '../../utils/unixToTime';
import moment from 'moment';
import faker from 'faker';
import { setNewListTasks } from '../../redux/reducers/tasks';

const GenerateButton = () => {
  const dispatch = useDispatch();

  const generateTime = (tasks) => {
    let startTime, endTime;
    const randomGap = Math.trunc(Math.random() * (5400 - 300 + 1) + 300);
    const randomTime = Math.trunc(Math.random() * (5400 - 1800 + 1) + 1800);
    const durationTimer = unixToTime(randomTime);
    if (!tasks[0]) {
      const randomStart = Math.trunc(Math.random() * (86400 + 1));
      endTime = unixToTime(randomTime + randomStart);
      startTime = unixToTime(randomStart);
    }

    if (tasks[0]) {
      const getLastEndTime = moment
        .duration(tasks[tasks.length - 1].endTime)
        .asSeconds();
      const nextStartTime = moment
        .duration(randomGap + getLastEndTime, 's')
        .asSeconds();
      startTime = unixToTime(nextStartTime);
      endTime = unixToTime(randomTime + nextStartTime);
    }
    return { startTime, endTime, durationTimer };
  };

  const generateTasks = () => {
    const newTaskList = [];
    for (let id = 10; id > 0; id--) {
      const { startTime, endTime, durationTimer } = generateTime(newTaskList);
      newTaskList.push({
        id: id,
        name: faker.lorem.sentence(),
        startTime: startTime,
        endTime: endTime,
        durationTime: durationTimer,
      });
    }
    dispatch(setNewListTasks(newTaskList));
  };

  return (
    <div>
      <StyleButtonGenerate onClick={generateTasks} m={3}>
        generate
      </StyleButtonGenerate>
    </div>
  );
};

export default connect((state) => ({
  tasks: state.tasks.tasks,
}))(GenerateButton);
