/**
 * This file provides queries which will be used in GraphQL codegen
 */

import { gql } from "@apollo/client";

export const GET_ALL_COMBAT_STATS = gql`
  query GetCombatStats {
    combats {
      id
      createdAt
      trial {
        name
      }
      player {
        name
      }
      playerGod {
        name
      }
      opponent {
        name
      }
      opponentGod {
        name
      }
      resultLongText
      resultShortText
      modifierAssignments {
        modifierLabel
        value
        valueType
      }
    }
  }
`;

export const GET_ALL_PROFESSION = gql`
  query GetProfessions {
    professions {
      name
      id
      description
      image {
        path
      }
      modifierAssignments {
        modifierLabel
        valueType
        value
      }
    }
  }
`;
