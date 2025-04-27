import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from 'const/common.const';

export function generateRandomString(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function formatCurrency(amount: number, locale = 'vi-VN'): string {
  if (Number.isNaN(amount)) {
    return '';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return formatter.format(amount);
}

export function toTitleCase(str: string): string {
  if (!str) return '';

  return str.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const keyBy = (array: any[], keyPath: string): Record<string, any> => {
  const result = {};

  array.forEach(x => {
    let value = x;

    const keyPaths: string[] = keyPath.split('.');

    keyPaths.forEach(key => {
      if (value === undefined) {
        return;
      }

      value = value[key];
    });

    if (value !== undefined) {
      result[value] = x;
    }
  });

  return result;
};

export const keyByArr = <T>(array: T[], keyPath: keyof T | string): Record<string, T[]> => {
  const result: Record<string, T[]> = {};

  array.forEach(x => {
    let resultKey = x;

    const keyPaths: string[] = String(keyPath).split('.');

    keyPaths.forEach(key => {
      if (resultKey === undefined) {
        return;
      }

      resultKey = resultKey[key];
    });

    if (resultKey !== undefined && typeof resultKey === 'string') {
      if (!result[resultKey]) {
        result[resultKey] = [];
      }

      result[resultKey].push(x);
    }
  });

  return result;
};

export const flipObject = <T extends string | number | symbol, K extends string | number | symbol>(
  obj: Record<T, K>
): Record<string, string> => {
  return Object.assign(
    {},

    ...Object.entries(obj).map(([a, b]) => ({
      [`${b}`]: a,
    }))
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getObj = (obj: object, path: string): any => {
  const fields = path.split('.');

  let curObj = obj;

  for (let i = 0; i < fields.length; i += 1) {
    if (curObj[fields[i]] === undefined) {
      return curObj;
    }

    curObj = curObj[fields[i]];
  }

  return curObj;
};

export const formatDate = (value: string | Date, formatType: 'date' | 'time' | 'datetime') => {
  let finalFormat: Intl.DateTimeFormatOptions = null;

  if (formatType === 'date') {
    finalFormat = DATE_FORMAT;
  } else if (formatType === 'time') {
    finalFormat = TIME_FORMAT;
  } else if (formatType === 'datetime') {
    finalFormat = DATE_TIME_FORMAT;
  }

  const formattedDate = new Date(value).toLocaleDateString('vi-VN', finalFormat);

  return formattedDate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
