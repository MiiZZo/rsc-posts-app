import '../app/global.css';
import './index.css';

import { Preview, Decorator } from '@storybook/react';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

const useTheme: Decorator = (Story, { globals: { theme } }) => {
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.add(inter.className);
  }, [theme]);

  return (
    <Story />
  );
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      items: [{ value: 'light', title: '☀️Light' }, { value: 'dark', title: '🌑Dark' }],
      dynamicTitle: true,
    },
  },
}

const preview: Preview = {
  decorators: [useTheme],
};

export default preview;
