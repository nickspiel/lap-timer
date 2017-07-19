export const millisecondsToTime = (duration) => {
  const milliseconds = parseInt((duration % 1000), 10);
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}.${milliseconds}`;
};
