import React from 'react';
//redux
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import TaskChart from '../TasksChart/TaskChart';

const initialState = {
  tasksReducer: {
    tasks: [
      {
        id: 3,
        name: 'theeth task',
        startTime: '16:52:00',
        endTime: '17:52:17',
        durationTime: '01:00:00',
      },
      {
        id: 1,
        name: 'first task',
        startTime: '13:06:32',
        endTime: '13:51:19',
        durationTime: '00:44:47',
      },
      {
        id: 2,
        name: 'second task',
        startTime: '22:08:37',
        endTime: '22:48:37',
        durationTime: '00:40:00',
      },
      {
        id: 4,
        name: 'fourth task',
        startTime: '18:56:59',
        endTime: '20:06:18',
        durationTime: '01:10:15',
      },
    ],
  },
};

describe('render correctly table component', () => {
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<TaskChart store={store} />);
  });

  describe('when component well mount call the method onCharts', () => {
    it('should add to the array the value of minutes that corresponds to the time', () => {
      const component = container.dive().dive();

      const minutesTask1 = component.state().data[13].minutes;
      const minutesTask2 = component.state().data[16].minutes;
      const minutesTask3 = component.state().data[17].minutes;
      const minutesTask5 = component.state().data[22].minutes;
      const minutesTask6 = component.state().data[18].minutes;
      const minutesTask7 = component.state().data[19].minutes;
      const minutesTask8 = component.state().data[20].minutes;

      expect(minutesTask1).toEqual(44);
      expect(minutesTask2).toEqual(8);
      expect(minutesTask3).toEqual(52);
      expect(minutesTask5).toEqual(40);
      expect(minutesTask6).toEqual(4);
      expect(minutesTask7).toEqual(60);
      expect(minutesTask8).toEqual(6);
    });
  });
});
