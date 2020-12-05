import moment from 'moment';
const unixToTime = seconds => {
  const formatTime = moment.utc(seconds * 1000).format('HH:mm:ss');
  return formatTime;
};

const isDifferenceInTime = (onStartTimer, onCLoseTimer) => {
  const isStartTimer = moment(onStartTimer, 'HH:mm:ss');
  const isCloseTimer = moment(onCLoseTimer, 'HH:mm:ss');
  const durationInMilisec = isStartTimer.diff(isCloseTimer);
  const formatDuration = moment.duration(durationInMilisec);
  const resultTime = formatDuration.valueOf() / 1000;
  return resultTime;
};

const CountMinuteChart = (copyData, tasks) => {
  tasks.forEach(item => {
    const startTimerHour = moment(item.startTime, 'HH:mm ');
    const nextHour = moment(startTimerHour.hours() + 1, 'HH:mm ');
    const endTimeHour = moment(item.endTime, 'HH:mm');
    const durationsInSecond = isDifferenceInTime(nextHour, startTimerHour);
    const durationToTime = moment.duration(durationsInSecond, 's');
    const timerDuration = moment.duration(item.durationTime, 's');
    const increase = moment
      .duration(durationToTime - timerDuration, 'ms')
      .asSeconds();
    if (increase > 0) {
      copyData[startTimerHour.hours()].minutes += moment(
        item.durationTime,
        'HH:mm:ss'
      ).minutes();
    }
    if (increase < 0) {
      if (increase * -1 < 3600) {
        copyData[startTimerHour.hours()].minutes += moment
          .duration(durationToTime, 'seconds')
          .minutes();
        copyData[endTimeHour.hours()].minutes += endTimeHour.minutes();
      }
      if (increase * -1 > 3600) {
        copyData[startTimerHour.hours()].minutes += moment
          .duration(durationToTime, 'seconds')
          .minutes();
        copyData[startTimerHour.hours() + 1].minutes = 60;
        copyData[endTimeHour.hours()].minutes += moment
          .duration(increase * -1, 'seconds')
          .minutes();
      }
    }
  });
};

export { unixToTime, isDifferenceInTime, CountMinuteChart };
