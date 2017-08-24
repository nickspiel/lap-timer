const getTimeParts = duration => ({
  milliseconds: parseInt((duration % 1000), 10),
  seconds: parseInt((duration / 1000) % 60, 10),
  minutes: parseInt((duration / (1000 * 60)) % 60, 10),
});

export const millisecondsToTime = (duration) => {
  const timeParts = getTimeParts(duration);
  const { milliseconds } = timeParts;
  let { seconds, minutes } = timeParts;

  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}.${milliseconds}`;
};

export const millisecondsToSpokenTime = (duration) => {
  let { milliseconds, seconds, minutes } = getTimeParts(duration);

  minutes = (minutes > 0) ? `${minutes} minutes` : '';
  seconds = (seconds > 0) ? `${seconds}` : '';
  milliseconds = (milliseconds > 0) ? `point ${milliseconds.toString().split('').join(' ')}` : '';

  return `${minutes}${seconds}${milliseconds} seconds`;
};

export const longestLapTime = racers => (
  racers.reduce((racerAcc, racer) => {
    const nextRacerLongestLap = racer.lapTimes.reduce((timeAcc, time) => (
      timeAcc > time ? timeAcc : time
    ));
    return racerAcc > nextRacerLongestLap ? racerAcc : nextRacerLongestLap;
  }, -Infinity)
);

export const shortestLapTime = racers => (
  racers.reduce((racerAcc, racer) => {
    const nextRacerLongestLap = racer.lapTimes.reduce((timeAcc, time) => (
      timeAcc < time ? timeAcc : time
    ));
    return racerAcc < nextRacerLongestLap ? racerAcc : nextRacerLongestLap;
  }, Infinity)
);
