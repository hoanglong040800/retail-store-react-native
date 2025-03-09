export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

export const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

export const DATE_TIME_FORMAT = {
  ...DATE_FORMAT,
  ...TIME_FORMAT,
};
