import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import Router, { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';

const navigateFx = createEffect((url: string) => Router.push(url));
const queryChanged = createEvent<ParsedUrlQuery>();
const $query = createStore<ParsedUrlQuery>({});

sample({
  clock: queryChanged,
  target: $query,
});

export const routerModel ={
  navigateFx,
  $query,
};

export function RouterEmitter() {
  const router = useRouter();
  const onChangeQuery = useUnit(queryChanged);
  
  useEffect(() => {
    onChangeQuery(router.query);
  }, [router.query]);


  return null;
}
