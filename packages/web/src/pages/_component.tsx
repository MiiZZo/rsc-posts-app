import { useUnit } from 'effector-react';
import { api } from 'shared/api';

export function SomeComponent() {
  const $data = useUnit(api.posts.getOneQuery.finished.notFound.$data);

  return (
    <h1>
      Hello
      {JSON.stringify($data)}
    </h1>
  );
}
