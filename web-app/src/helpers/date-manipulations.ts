const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (firstDate: any, secondDate: any): number => {
  let utc1 = new Date(firstDate * 1000);
  let utc2 = new Date(secondDate * 1000);

  return Math.floor(
    (Date.UTC(utc2.getFullYear(), utc2.getMonth(), utc2.getDate()) -
      Date.UTC(utc1.getFullYear(), utc1.getMonth(), utc1.getDate())) /
      _MS_PER_DAY
  );
};

export const getMonthName = (monthInNumber: string): string => {
  switch (parseInt(monthInNumber)) {
    case 1:
      return "Հունվար";
    case 2:
      return "Փետրվար";
    case 3:
      return "Մարտ";
    case 4:
      return "Ապրիլ";
    case 5:
      return "Մայիս";
    case 6:
      return "Հունիս";
    case 7:
      return "Հուլիս";
    case 8:
      return "Օգոստոս";
    case 9:
      return "Սեպտեմբեր";
    case 10:
      return "Հոկտեմբեր";
    case 11:
      return "Նոյեմբեր";
    case 12:
      return "Դեկտեմբեր";

    default:
      return "";
  }
};
