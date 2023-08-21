import { createEffect } from 'effector';
import Router from 'next/router';

const navigateFx = createEffect((url: string) => Router.push(url))

export const routerModel ={
  navigateFx,
};
