import { PropsWithChildren } from 'react';
import { m } from 'framer-motion';

export function DefaultLayoutAnimation({ children }: PropsWithChildren) {
  return (
    <m.div
      initial={{ scale: 0.8, opacity: 0.2 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </m.div>
  );
}
