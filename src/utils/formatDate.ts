const getMonthName = (monthIndex: number): string => {
  switch (monthIndex) {
    case 0:
      return 'Янв';
    case 1:
      return 'Фев';
    case 2:
      return 'Мар';
    case 3:
      return 'Апр';
    case 4:
      return 'Май';
    case 5:
      return 'Июн';
    case 6:
      return 'Июл';
    case 7:
      return 'Авг';
    case 8:
      return 'Сен';
    case 9:
      return 'Окт';
    case 10:
      return 'Ноя';
    case 11:
      return 'Дек';
    default:
      return 'Яхз';
  }
};

const getTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

const getRelativeDay = (date: Date): string => {
  const today = new Date();
  if (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  ) {
    return 'Сегодня';
  }

  const year = date.getFullYear();
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};

const formatDate = (date: Date): string => {
  const formattedDate = getRelativeDay(date);
  const time = getTime(date);
  return `${formattedDate} в ${time}`;
};

export default formatDate;
