import { MantineProvider } from '@mantine/core';
import { render as testingLibraryRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export * from '@testing-library/react';
export { userEvent };

export const render = (component: JSX.Element) => {
  return testingLibraryRender(component, { 
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider>
        {children}
      </MantineProvider>
    ),
  });
};
