 export function addZeroBefore (n)  {
    return (n < 10 ? "0" : "") + n;
  };

  export function humanizeDay (day)  {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "XXX";
    }
  };
  export function humanizeDayMini (day)  {
    switch (day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "XXX";
    }
  };
  export function humanizeMonth (month)  {
    switch (month) {
      case 0:
        return "Jan.";
      case 1:
        return "Feb.";
      case 2:
        return "Mar.";
      case 3:
        return "Apr.";
      case 4:
        return "May.";
      case 5:
        return "Jun.";
      case 6:
        return "Jul.";
      case 7:
        return "Ago.";
      case 8:
        return "Sep.";
      case 9:
        return "Oct.";
      case 10:
        return "Nov.";
      case 11:
        return "Dec.";
      default:
        return "XXX";
    }
  };