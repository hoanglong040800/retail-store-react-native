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
