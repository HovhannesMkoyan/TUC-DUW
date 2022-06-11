export default (date: Date, lang: string) => {
  const day = date.getDate();
  let month: number | string = date.getMonth();
  const year = date.getFullYear();

  if (lang === "am") {
    switch (month) {
      case 1:
        month = "Հունվար";
        break;
      case 2:
        month = "Փետրվար";
        break;
      case 3:
        month = "Մարտ";
        break;
      case 4:
        month = "Ապրիլ";
        break;
      case 5:
        month = "Մայիս";
        break;
      case 6:
        month = "Հունիս";
        break;
      case 7:
        month = "Հուլիս";
        break;
      case 8:
        month = "Օգոստոս";
        break;
      case 9:
        month = "Սեպտեմբեր";
        break;
      case 10:
        month = "Հոկտեմբեր";
        break;
      case 11:
        month = "Նոյեմբեր";
        break;
      case 12:
        month = "Դեկտեմբեր";
        break;

      default:
        break;
    }
  } else {
    month = date.toLocaleString("default", { month: "short" });
  }

  return `${day} ${month}, ${year}`;
};
