export const millisecondsToTime = (duration) => {
  const milliseconds = parseInt((duration % 1000), 10);
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}.${milliseconds}`;
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
