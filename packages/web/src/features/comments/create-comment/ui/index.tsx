import { FormEvent } from 'react';
import { reflect, variant } from '@effector/reflect';
import { Box, Button, LoadingOverlay, Textarea, rem } from '@mantine/core';
import * as model from '../model';
import { viewerModel } from 'shared/viewer';
import { useUnit } from 'effector-react';

const Field = reflect({
  view: Textarea,
  bind: {
    value: model.createCommentForm.fields.body.$value,
    error: model.createCommentForm.fields.body.$errors.map((errors) => errors[0] || ''),
    onChange: model.createCommentForm.fields.body.changed.prepend((e) => e.target.value),
  },
});

interface Props {
  isLoading: boolean;
  onSubmit: () => void;
}

export function CreateCommentView({
  onSubmit,
}: Props) {
  const isLoading = useUnit(model.$isLoading);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Box pos="relative">
        <LoadingOverlay 
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Field placeholder='Write your comment...' autosize minRows={5} maxRows={10} maw={rem(600)} />
        <Button type="submit" mt="sm">Submit</Button>
      </Box>
    </form>
  );
}

export const CreateComment = variant({
  if: viewerModel.$isAuth,
  then: reflect({
    view: CreateCommentView,
    bind: {
      isLoading: model.$isLoading,
      onSubmit: model.createCommentForm.submit,
    },
  }),
});
