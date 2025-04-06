import { graphql } from '../codegen';

export const COMMON_TAG_FRAGMENT = graphql(`
  fragment CommonTag on Tag {
    id
    name
  }
`);

export const GET_ALL_TAGS_QUERY = graphql(`
  query GetAllTags($input: TagListInput) {
    tags(input: $input) {
      items {
        ...CommonTag
      }
    }
  }
`);

export const CREATE_TAG_MUTATION = graphql(`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      apiErrors {
        code
        message
      }
      tag {
        id
      }
    }
  }
`);
