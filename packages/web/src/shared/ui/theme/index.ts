import { Anchor, createTheme } from '@mantine/core';

export const themeLib = {
  theme: createTheme({
    fontFamily: 'Inter',
    cursorType: 'pointer',
    components: {
      Anchor: Anchor.extend({
        defaultProps: {
          underline: 'never',
        },
      }),
    },
  }),
}
