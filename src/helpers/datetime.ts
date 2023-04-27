function getTimeSince(date: Date) {
  const units = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30.44 * 24 * 60 * 60 * 1000,
    year: 365.25 * 24 * 60 * 60 * 1000,
  };

  const difference = (size: number) => {
    return Math.round(Math.abs(Date.now() - date.valueOf()) / size);
  };

  const timeSince = difference(1);
  let formattedTimeSince = '';

  Object.values(units).every((value, index) => {
    if (timeSince < value) {
      if (index === 0) {
        // if timeSince is less than one second
        formattedTimeSince = 'now';
        return false;
      }

      const [lowerUnit, lowerValue] = Object.entries(units)[index - 1];
      const plural = difference(lowerValue) > 1;

      formattedTimeSince = `${difference(lowerValue)} ${lowerUnit}${plural ? 's' : ''} ago`;
      return false;
    }
    if (index === Object.values(units).length - 1) {
      // if timeSince is more than one year
      formattedTimeSince = `${difference(value)} year${difference(value) > 1 ? 's' : ''} ago`;
    }

    return true;
  });

  return formattedTimeSince;
}

export { getTimeSince };
