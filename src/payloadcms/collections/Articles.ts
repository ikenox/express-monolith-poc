import { CollectionConfig } from 'payload/types';

const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'body',
      type: 'text',
    },
    {
      name: 'bodyHtml',
      type: 'richText',
    },
  ],
};

export default Articles;
