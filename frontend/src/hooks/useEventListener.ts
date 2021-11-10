import { EventHandler, useEffect } from 'react';

const useEventListener = (
  event: string,
  handler: EventHandler<any>,
  element: globalThis.Element | globalThis.Window = global.window,
) => {
  useEffect(() => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
  }, []);
};

export default useEventListener;
