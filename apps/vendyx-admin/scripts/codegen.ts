import { type CodegenConfig } from '@graphql-codegen/cli';

const GQL_SCHEMA_URL = process.env.VENDYX_API_URL + '/admin-api';

const config: CodegenConfig = {
  schema: GQL_SCHEMA_URL,
  documents: ['./src/api/**/*.ts'],
  generates: {
    './src/api/codegen/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      },
      config: {
        documentMode: 'string'
      }
    }
  }
};

export default config;
