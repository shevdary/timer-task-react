export const countTime = (currentTime, tasks) => {

  const data = new Date();
  const date = data.toLocaleTimeString();
  let minutes = currentTime ? Math.trunc((currentTime / 60) % 60) : 0;
  const hours = minutes == null ? 0 : Math.trunc((currentTime / 60 / 60) % 60);
  const second = currentTime > 60 ? currentTime % 60 : currentTime;
  const secEnd =
    data.getSeconds() + currentTime > 60
      ? (data.getSeconds() + currentTime) % 60
      : data.getSeconds() + currentTime;
  let minEnd;
  if (minutes + data.getMinutes() >= 60 && data.getSeconds() + second >= 60) {
    minEnd =
      Math.trunc((minutes + data.getMinutes()) % 60) +
      Math.trunc((second + data.getSeconds()) / 60);
  }
  if (minutes + data.getMinutes() >= 60 && data.getSeconds() + second < 60) {
    minEnd = Math.trunc((minutes + data.getMinutes()) % 60);
  }
  if (minutes + data.getMinutes() < 60 && data.getSeconds() + second >= 60) {
    minEnd =
      minutes +
      data.getMinutes() +
      Math.trunc((second + data.getSeconds()) / 60);
  }
  if (minutes + data.getMinutes() < 60 && data.getSeconds() + second < 60) {
    minEnd = minutes + data.getMinutes();
  }
  const hourEnd =
    hours + data.getHours() + Math.trunc((minutes + data.getMinutes()) / 60);

  const timeEnd = `${hourEnd < 10 ? "0" + hourEnd : hourEnd}:${
    minEnd < 10 ? "0" + minEnd : minEnd
  }:${secEnd < 10 ? "0" + secEnd : secEnd}`;

  const countTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${second < 10 ? "0" + second : second}`;
  return { timeEnd, countTime, date };
};