import { CollectionConfig } from 'payload/types';

const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'body',
      type: 'text',
    },
  ],
};

export default Articles;
