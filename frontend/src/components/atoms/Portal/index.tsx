import { PropsWithChildren, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren<{}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.getElementById('portal') as Element) : null;
};

export default Portal;
