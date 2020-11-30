import moment from "moment";
const unixToTime = seconds => {
  const formatted = moment.utc(seconds * 1000).format("HH:mm:ss");
  return formatted;
};

const isDifferenceTime = (onStartTimer, onCLoseTimer) => {
  const isStartTimer = moment(onStartTimer, "HH:mm:ss");
  const isCloseTimer = moment(onCLoseTimer, "HH:mm:ss");
  const differenceInMs = isStartTimer.diff(isCloseTimer);
  const duration = moment.duration(differenceInMs);
  const timer = (duration.valueOf())/1000;
  return timer;
};

export { unixToTime, isDifferenceTime };