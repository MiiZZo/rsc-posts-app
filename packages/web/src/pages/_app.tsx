import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { EffectorNext } from '@effector/next';
import { Container, AppShell, MantineProvider, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StrictMode } from 'react';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { Header } from 'widgets/header';
import { themeLib } from 'shared/ui/theme';
import './index.css';
import { RouterEmitter } from 'shared/router';

export default function App({
  Component,
  pageProps: { values, ...pageProps },
}: AppProps) {
  return (
    <StrictMode>
      <MantineProvider
        theme={themeLib.theme}
      >
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        </Head>
        <Notifications position="top-center" />
        <EffectorNext values={values}>
          <RouterEmitter />
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence mode="wait" initial={false}>
              <AppShell header={{ height: rem(50) }} padding="lg">
                <AppShell.Header>
                  <Header />
                </AppShell.Header>
                <AppShell.Main>
                  <Container mt={rem(20)} size="lg">
                    <Component {...pageProps} />
                  </Container>
                </AppShell.Main>
              </AppShell>
            </AnimatePresence>
          </LazyMotion>
        </EffectorNext>
      </MantineProvider>
    </StrictMode>
  );
}
