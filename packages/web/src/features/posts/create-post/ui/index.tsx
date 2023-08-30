import { Tabs } from '@mantine/core';
import { CreateOnePostForm } from './write';
import { WritePreview } from './preview';
import { IoMdCreate, IoMdEye } from 'react-icons/io';

export function CreatePost() {
  return (
    <Tabs variant="outline" defaultValue="write">
      <Tabs.List>
        <Tabs.Tab value="write" leftSection={<IoMdCreate />}>
          Write
        </Tabs.Tab>
        <Tabs.Tab value="preview" leftSection={<IoMdEye />}>
          Preview
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="write" mt="lg">
        <CreateOnePostForm />
      </Tabs.Panel>
      <Tabs.Panel value="preview" mt="lg">
        <WritePreview />
      </Tabs.Panel>
    </Tabs>
  );
}
