import React from 'react';
import { connect, useDispatch } from 'react-redux';
// other
import moment from 'moment';
import faker from 'faker';
import { updateTasks } from '../../redux/reducers/tasks';
import { unixToTime } from '../../utils/unixToTime';
import { StyleButtonGenerate } from '../../material/customStyles';

const GenerateButton = () => {
  const dispatch = useDispatch();

  const generateTime = (tasks) => {
    let startTime;
    let endTime;
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
        id,
        name: faker.lorem.sentence(),
        startTime,
        endTime,
        durationTime: durationTimer,
      });
    }
    dispatch(updateTasks(newTaskList));
  };

  return (
    <StyleButtonGenerate onClick={generateTasks} m={3}>
      generate
    </StyleButtonGenerate>
  );
};

export default connect((state) => ({
  tasks: state.tasks.tasks,
}))(GenerateButton);
