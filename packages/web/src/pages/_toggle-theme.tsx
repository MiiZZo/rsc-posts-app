import { Button, useMantineColorScheme } from '@mantine/core';
import { ClientOnly } from './_client-only';

function ToggleThemeView() {
  const { setColorScheme, clearColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <>
      <Button.Group>
        <Button
          disabled={colorScheme === 'light'}
          onClick={() => setColorScheme('light')}
        >
          Light
        </Button>
        <Button
          disabled={colorScheme === 'dark'}
          onClick={() => setColorScheme('dark')}
        >
          Dark
        </Button>
      </Button.Group>
    </>
  );
};

export function ToggleTheme() {
  return (
    <ClientOnly>
      <ToggleThemeView />
    </ClientOnly>
  )
}
