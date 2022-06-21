import moment from "moment";

export default (date: Date): string => {
  const momentDate = moment(date);

  return `${momentDate.date()} ${momentDate.format(
    "MMMM"
  )}, ${momentDate.year()} at ${momentDate.hours()}:${momentDate.minutes()}`;
};
