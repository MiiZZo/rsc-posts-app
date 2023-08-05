import '@mantine/core/styles.css';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { Header } from 'widgets/header';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            primaryColor: 'dark',
          }}
        >
          <Header />
          <Container size="lg">{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}
