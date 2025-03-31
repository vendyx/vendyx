import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

export const SHARED_SCHEMA_PATH = './src/api/shared/**/*.gql';

/**
 * Module to create a GraphQL API used for /admin-api and /storefront-api
 */
@Module({})
export class GraphqlApiModule {
  static register(options: GraphqlApiModuleOptions): DynamicModule {
    return {
      imports: options.include,
      ...GraphQLModule.forRoot<ApolloDriverConfig>({
        // false to use apollo studio
        playground: false,
        resolvers: { JSON: GraphQLJSON },
        // TODO: false in production, true in dev
        includeStacktraceInErrorResponses: false,
        // Always true because the graphql playground must be public
        introspection: true,
        driver: ApolloDriver,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        path: options.path,
        typePaths: options.typePaths,
        include: options.include,
        // Al unhandled http error comes here (executed after filters)
        // TODO: if a prisma error is thrown in the resolver, it will be not caught by the filter
        formatError: error => {
          const originalError = error.extensions?.originalError as OriginalError;

          // Http exception throw by nestjs
          if (!originalError) {
            const isInternalServerError = error.extensions?.code === 'INTERNAL_SERVER_ERROR';
            Logger.error({
              type: 'NESTJS_ERROR',
              ...error
            });
            return {
              message: isInternalServerError ? 'Internal server error' : error.message,
              code: error.extensions?.code
            };
          }

          // Http exception throw by us
          return {
            message: originalError.message,
            code: originalError.statusCode
          };
        },
        context: ({ req }) => ({ req })
      })
    };
  }
}

type GraphqlApiModuleOptions = {
  include: any[];
  typePaths: string[];
  path: string;
};

type OriginalError = {
  statusCode: number;
  message: string;
  error: string;
};
