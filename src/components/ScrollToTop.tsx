import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use requestAnimationFrame to ensure the scroll happens after the new page 
    // content has been added to the DOM and is ready to be painted.
    const scroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    const handle = requestAnimationFrame(scroll);

    // Trigger Meta Pixel PageView tracking on page/route transition
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }

    return () => cancelAnimationFrame(handle);
  }, [pathname]);

  return null;
}
