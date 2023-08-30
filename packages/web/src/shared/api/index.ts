import { initClient } from '@simple-contract/effector';
import { contract } from 'common/contract';
import { viewerModel } from 'shared/viewer';

export const api = initClient({
  contract,
  baseHeaders: {
    Authorization: viewerModel.$accessToken.map((accessToken) => `Bearer ${accessToken}`),
  },
});
