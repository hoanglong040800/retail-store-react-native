import { EventDataType } from 'types';

export const subscribeEvent = (eventName: string, listener: (event: CustomEvent<EventDataType>) => void): void => {
  document.addEventListener(eventName, listener);
};

export const unsubscribeEvent = (eventName: string, listener: (event: CustomEvent<EventDataType>) => void): void => {
  document.removeEventListener(eventName, listener);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const publishEvent = (eventName: string, data: EventDataType): void => {
  const event = new CustomEvent<EventDataType>(eventName, { detail: data });
  document.dispatchEvent(event);
};
