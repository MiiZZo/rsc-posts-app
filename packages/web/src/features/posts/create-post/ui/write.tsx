import { PropsWithChildren } from 'react';
import { TextInput, Textarea, Button, Stack, Fieldset, LoadingOverlay } from '@mantine/core';
import { reflect } from '@effector/reflect';
import { IoMdCreate } from 'react-icons/io';
import * as model from '../model';

const TitleField = reflect({
  view: TextInput,
  bind: {
    value: model.createPostForm.fields.title.$value,
    error: model.createPostForm.fields.title.$errors.map((errors) => errors[0]),
    onChange: model.createPostForm.fields.title.changed.prepend((e) => e.target.value),
  },
});

const BodyTextarea = reflect({
  view: Textarea,
  bind: {
    value: model.createPostForm.fields.body.$value,
    error: model.createPostForm.fields.body.$errors.map((errors) => errors[0]),
    onChange: model.createPostForm.fields.body.changed.prepend((e) => e.target.value),
  },
});

interface Props {
  isFormValid: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CreateOnePostFormView({
  isSubmitting,
  children,
  onSubmit,
}: PropsWithChildren<Props>) {
  return (
    <form
      name="create-post"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    > 
      <Fieldset pos="relative">
        <LoadingOverlay visible={isSubmitting} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Stack>
          {children}
          <Button
            variant="filled"
            color="green"
            type="submit"
            rightSection={<IoMdCreate />}
          >
            Submit
          </Button>
        </Stack>
      </Fieldset>
    </form>
  );
}

export const CreateOnePostForm = reflect({
  view: CreateOnePostFormView,
  bind: {
    children: (
      <>
        <TitleField label="Title" required />
        <BodyTextarea required autosize minRows={10} maxRows={30} />
      </>
    ),
    isFormValid: model.createPostForm.$isFormValid,
    isSubmitting: model.createOneQuery.$isPending,
    onSubmit: model.createPostForm.submit,
  },
});
