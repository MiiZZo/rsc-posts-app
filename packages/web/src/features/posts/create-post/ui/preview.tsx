import { reflect } from '@effector/reflect';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as model from '../model';
import { Table } from '@mantine/core';

export const WritePreview = reflect({
  view: ({ markdown }: { markdown: string }) => (
    <ReactMarkdown
      components={{
        td: ({ children }) => {
          return <Table.Td>{children}</Table.Td>;
        },
        table: ({ children }) => {
          return <Table>{children}</Table>;
        },
        thead: ({ children }) => {
          return <Table.Thead>{children}</Table.Thead>;
        },
        tr: ({ children }) => {
          return <Table.Tr>{children}</Table.Tr>;
        },
        th: ({ children }) => {
          return <Table.Th>{children}</Table.Th>
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  ),
  bind: {
    markdown: model.createPostForm.fields.body.$value,
  },
});
