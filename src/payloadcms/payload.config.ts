import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { Hello } from './components/Hello';
import Articles from './collections/Articles';

export default buildConfig({
  routes: {
    api: '/payload/api',
    admin: '/payload/admin',
  },
  admin: {
    components: {
      Nav: Hello,
    },
    user: Users.slug,
  },
  collections: [Users, Articles],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
});
