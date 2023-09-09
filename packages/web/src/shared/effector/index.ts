import { Unit, createEvent, createStore, sample } from 'effector';
import { createFactory } from '@withease/factories';
import { delay } from 'patronum/delay';

interface Config {
  loadingEnded: Unit<unknown>;
  loadingStarted: Unit<unknown>;
}

const createDelayedLoading = createFactory(({
  loadingEnded,
  loadingStarted,
}: Config) => {
  const $isLoading = createStore(false);

  const setIsLoading = createEvent<boolean>();

  $isLoading
    .on(setIsLoading, (_, isLoading) => isLoading);

  delay({
    source: loadingEnded,
    timeout: 200,
    target: setIsLoading.prepend(() => false),
  });

  sample({
    clock: loadingStarted,
    target: setIsLoading.prepend(() => true),
  });

  return {
    $isLoading
  };
});

export const effectorLib = {
  createDelayedLoading,
};
