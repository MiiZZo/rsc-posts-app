import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../src/pages/index.css';
import { MantineProvider } from '@mantine/core';
import { themeLib } from 'shared/ui/theme';

import { Decorator, Preview } from '@storybook/react';

const withMantine: Decorator = (Story) => (
  <MantineProvider theme={themeLib.theme}>
    <Story />
  </MantineProvider>
)

const preview: Preview = {
  decorators: [withMantine],
};

export default preview;
