import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import { payloadCloud } from '@payloadcms/plugin-cloud'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    {
      slug: 'articles',
      access: { read: () => true },
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
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
})
