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

export const GET_COMBAT_ID = gql`
  query Combat($combatId: String!) {
    combat(id: $combatId) {
      id
      player {
        name
        image {
          path
        }
      }
      playerGod {
        image {
          path
        }
        name
      }
      opponent {
        name
        image {
          path
        }
      }
      opponentGod {
        image {
          path
        }
      }
      trial {
        name
        image {
          path
        }
      }
    }
  }
`;
