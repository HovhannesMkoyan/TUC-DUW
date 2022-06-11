export default (array: any): any => {
  const monthArray: any = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  array.map((dateValue: any) => {
    let date = new Date(dateValue).getMonth() + 1;
    monthArray[date] = monthArray[date] + 1;
  });

  return monthArray;
};
