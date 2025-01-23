/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getFragmentData } from '../codegen';
import { type GenerateUserAccessTokenInput, type UserErrorCode } from '../codegen/graphql';
import { getUserError } from '../errors/user.errors';
import {
  COMMON_USER_FRAGMENT,
  GENERATE_ACCESS_TOKEN_MUTATION,
  VALIDATE_ACCESS_TOKEN_QUERY,
  WHOAMI_QUERY
} from '../operations/user.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const UserService = {
  Tags: {
    user: 'user'
  },

  async whoami() {
    const result = await serviceGqlFetcher(
      WHOAMI_QUERY,
      {},
      {
        tags: [UserService.Tags.user]
      }
    );

    const user = getFragmentData(COMMON_USER_FRAGMENT, result.whoami);

    if (!user) {
      throw new Error('Whoami used in no authenticated context');
    }

    return user;
  },

  async generateAccessToken(
    input: GenerateUserAccessTokenInput
  ): Promise<GenerateAccessTokenResult> {
    const {
      generateUserAccessToken: { apiErrors, accessToken }
    } = await serviceGqlFetcher(GENERATE_ACCESS_TOKEN_MUTATION, { input });

    const error = getUserError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, accessToken: accessToken! };
  },

  async validateAccessToken() {
    const result = await serviceGqlFetcher(VALIDATE_ACCESS_TOKEN_QUERY);

    return result.validateAccessToken;
  }
};

type GenerateAccessTokenResult =
  | {
      success: true;
      accessToken: string;
    }
  | {
      success: false;
      error: string;
      errorCode: UserErrorCode;
    };
