export default (time: string | number): string => {
  time = +time;
  if (time > 1) {
    return Math.round(time * 2) / 2 + " ժամ";
  } else {
    return Math.round(time * 60) + " րոպե";
  }
};
