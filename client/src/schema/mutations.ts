/**
 * This file provides mutations which will be used in GraphQL codegen
 */

import { gql } from "@apollo/client";

export const CREATE_TEMPORARY_COMPETITOR = gql`
  mutation CreateTemporaryCompetitor {
    createTemporaryCompetitor {
      id
      name
      status
      modifierAssignments {
        modifierLabel
        value
        valueType
      }
      profession {
        id
        name
      }
      image {
        id
        path
      }
    }
  }
`;

export const DELETE_TEMPORARY_COMPETITOR = gql`
  mutation DeleteTemporaryCompetitor($deleteTemporaryCompetitorId: String!) {
    deleteTemporaryCompetitor(id: $deleteTemporaryCompetitorId)
  }
`;
