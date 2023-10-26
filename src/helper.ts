export default class Helper {
  public static getCorrect(value: any): any {
    if (value === false || value === true) {
      return value;
    } else if (value === null) {
      return `null`;
    } else if (value === '0' || value === 0) {
      return 0;
    } else if (value === '') {
      return `''`;
    } else if (+value) {
      return +value;
    } else if (/'/.test(value)) {
      return `'${value.replace("'", "''")}'`;
    } else if (typeof value === 'object' && value !== null) {
      return `'${JSON.stringify(value)}'`;
    } else return `'${value}'`;
  }

  public static getEndOfDayTime = (time: Date): Date => {
    return new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      23,
      59,
      59,
    );
  };

  public static calcCTR = (
    impressionCount: number,
    clickCount: number,
  ): number => {
    return (100 * clickCount) / impressionCount;
  };

  public static calcEvPM = (
    impressionCount: number,
    eventCount: number,
  ): number => {
    return (1000 * eventCount) / impressionCount;
  };
}
