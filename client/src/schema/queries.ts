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
      resultLongText
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

export const getTrial = gql`
  query GetTrial {
    getTrial {
      description
      name
      image {
        path
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

export const GET_COMBAT_RESULT = gql`
  query CombatResult($combatResultId: String!) {
    combatResult(id: $combatResultId) {
      id
      resultLongText
      resultShortText
      combatDetail
    }
  }
`;
