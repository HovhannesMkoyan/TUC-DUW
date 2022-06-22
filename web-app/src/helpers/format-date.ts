import moment from "moment";

const addNecessaryO = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

export default (date: Date): string => {
  const momentDate = moment(date);

  return `${momentDate.date()} ${momentDate.format(
    "MMMM"
  )}, ${momentDate.year()} at ${addNecessaryO(
    momentDate.hours()
  )}:${addNecessaryO(momentDate.minutes())}`;
};
