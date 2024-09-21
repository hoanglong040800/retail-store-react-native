export const subscribeEvent = (eventName: string, listener: (event: CustomEvent) => void): void => {
  document.addEventListener(eventName, listener);
};

export const unsubscribeEvent = (eventName: string, listener: (event: CustomEvent) => void): void => {
  document.removeEventListener(eventName, listener);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publishEvent = (eventName: string, data: any): void => {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
};
