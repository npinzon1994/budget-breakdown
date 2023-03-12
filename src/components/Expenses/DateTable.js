const dateTable = (month) => {
  let formattedMonth = "Jan";
  switch (month) {
    
    case 0:
      formattedMonth = "Jan";
      break;

    case 1:
      formattedMonth = "Feb";
      break;

    case 2:
      formattedMonth = "Mar";
      break;

    case 3:
      formattedMonth = "Apr";
      break;

    case 4:
      formattedMonth = "May";
      break;

    case 5:
      formattedMonth = "Jun";
      break;

    case 6:
      formattedMonth = "Jul";
      break;

    case 7:
      formattedMonth = "Aug";
      break;

    case 8:
      formattedMonth = "Sep";
      break;

    case 9:
      formattedMonth = "Oct";
      break;

    case 10:
      formattedMonth = "Nov";
      break;

    case 11:
      formattedMonth = "Dec";
      break;

    default:
      console.log('No month?');
      break;
  }

  return formattedMonth;
};

export default dateTable;
