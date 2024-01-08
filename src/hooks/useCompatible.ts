import { useEffect } from 'react';

export default (mountElement: React.MutableRefObject<HTMLElement> | null) => {
  useEffect(() => {
    if (!mountElement?.current) {
      return;
    }
    const IS_SAFARI =
      /Safari/.test(window.navigator.userAgent) &&
      /Apple Computer/.test(window.navigator.vendor);
    if (IS_SAFARI) {
      mountElement.current.classList.add('safiri');
    }
  }, [mountElement]);
};
