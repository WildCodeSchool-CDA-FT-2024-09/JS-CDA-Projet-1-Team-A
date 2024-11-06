/**
 * This file provides queries which will be used in GraphQL codegen
 */
import { DocumentNode } from "@apollo/client";
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

export const GetGodimageDocument: DocumentNode = gql`
  query GetGodimage {
    getGod {
      image {
        path
      }
    }
  }
`;

export const ImageFiltre = gql`
  query GetImageFiltre($type: String!) {
    getImage(type: $type) {
      path
      type
    }
  }
`;
