import moment from 'moment';
const unixToTime = (seconds) => {
  const formatTime = moment.utc(seconds * 1000).format('HH:mm:ss');
  return formatTime;
};

const isDifferenceInTime = (onStartTimer, onCLoseTimer) => {
  const isStartTimer = moment(onStartTimer, 'HH:mm:ss');
  const isCloseTimer = moment(onCLoseTimer, 'HH:mm:ss');
  const durationInMs = isStartTimer.diff(isCloseTimer);
  const formatDuration = moment.duration(durationInMs);
  const resultTime = formatDuration.valueOf() / 1000;
  return resultTime;
};

const countMinuteChart = (chartAxis, tasks) => {
  chartAxis.map((item) => (item.minutes = 0));
  tasks.map((item) => {
    const startTimerInHour = moment(item.startTime, 'HH:mm:ss ');
    const nextHour = moment(startTimerInHour.hours() + 1, 'HH:mm:ss ');
    const endTimerInHour = moment(item.endTime, 'HH:mm:ss');
    const differenceHour = isDifferenceInTime(nextHour, startTimerInHour);
    const differenceInSeconds = moment.duration(differenceHour, 's');
    const taskDurationInSeconds = moment.duration(item.durationTime, 's');
    const increaseDuration = moment
      .duration(differenceInSeconds - taskDurationInSeconds, 'ms')
      .asSeconds();
    if (increaseDuration > 0) {
      chartAxis[startTimerInHour.hours()].minutes += moment(
        item.durationTime,
        'HH:mm:ss'
      ).minutes();
    }

    if (increaseDuration < 0) {
      if (increaseDuration * -1 < 3600) {
        chartAxis[startTimerInHour.hours()].minutes += moment
          .duration(differenceInSeconds, 'seconds')
          .minutes();
        chartAxis[endTimerInHour.hours()].minutes += endTimerInHour.minutes();
      }

      if (increaseDuration * -1 > 3600) {
        chartAxis[startTimerInHour.hours()].minutes += moment
          .duration(differenceInSeconds, 'seconds')
          .minutes();
        chartAxis[nextHour.hours()].minutes = 60;
        chartAxis[endTimerInHour.hours()].minutes += moment
          .duration(increaseDuration * -1, 'seconds')
          .minutes();
      }
    }
  });
};

export { unixToTime, isDifferenceInTime, countMinuteChart };
