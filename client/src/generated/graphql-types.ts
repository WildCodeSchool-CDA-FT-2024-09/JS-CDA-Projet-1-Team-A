import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DateTimeISO: { input: any; output: any };
};

export type Combat = {
  __typename?: "Combat";
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<CombatModifiers>>;
  opponent: Competitor;
  opponentGod: God;
  player: Competitor;
  playerGod: God;
  resultLongText: Scalars["String"]["output"];
  resultShortText: Scalars["String"]["output"];
  trial: Trial;
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type CombatModifiers = {
  __typename?: "CombatModifiers";
  id: Scalars["String"]["output"];
  modifierLabel: Scalars["String"]["output"];
  value: Scalars["Float"]["output"];
  valueType: Scalars["String"]["output"];
};

export type Competitor = {
  __typename?: "Competitor";
  avatarImage: Image;
  battleImage: Image;
  createdAt: Scalars["DateTimeISO"]["output"];
  god?: Maybe<God>;
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
  profession: Profession;
  status: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type God = {
  __typename?: "God";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type Image = {
  __typename?: "Image";
  id: Scalars["Float"]["output"];
  path: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type Modifier = {
  __typename?: "Modifier";
  id: Scalars["Float"]["output"];
  label: Scalars["String"]["output"];
  modifierAssignments: Array<ModifierAssignment>;
};

export type ModifierAssignment = {
  __typename?: "ModifierAssignment";
  id: Scalars["Float"]["output"];
  modifiedEntity: Scalars["ID"]["output"];
  modifiedEntityId: Scalars["String"]["output"];
  modifiedEntityType: Scalars["String"]["output"];
  modifier: Modifier;
  value: Scalars["Float"]["output"];
  valueType: Scalars["String"]["output"];
};

export type Profession = {
  __typename?: "Profession";
  competitors: Array<Competitor>;
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  combat?: Maybe<Combat>;
  combats: Array<Combat>;
  competitorsWithoutImages: Array<Competitor>;
  getCompetitor: Array<Competitor>;
  getGod: Array<God>;
  getProfession: Array<Profession>;
};

export type QueryCombatArgs = {
  id: Scalars["String"]["input"];
};

export type Trial = {
  __typename?: "Trial";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type GetCombatStatsQueryVariables = Exact<{ [key: string]: never }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetCombatStatsQuery = {
  __typename?: "Query";
  combats: Array<{
    __typename?: "Combat";
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt: any;
    resultLongText: string;
    resultShortText: string;
    trial: { __typename?: "Trial"; name: string };
    player: { __typename?: "Competitor"; name: string };
    playerGod: { __typename?: "God"; name: string };
    opponent: { __typename?: "Competitor"; name: string };
    opponentGod: { __typename?: "God"; name: string };
    modifierAssignments?: Array<{
      __typename?: "CombatModifiers";
      modifierLabel: string;
      value: number;
      valueType: string;
    }> | null;
  }>;
};

export type CombatQueryVariables = Exact<{
  combatId: Scalars["String"]["input"];
}>;

export type CombatQuery = {
  __typename?: "Query";
  combat?: {
    __typename?: "Combat";
    id: string;
    player: {
      __typename?: "Competitor";
      name: string;
      image: { __typename?: "Image"; path: string };
    };
    playerGod: {
      __typename?: "God";
      name: string;
      image?: { __typename?: "Image"; path: string } | null;
    };
    opponent: {
      __typename?: "Competitor";
      name: string;
      image: { __typename?: "Image"; path: string };
    };
    opponentGod: {
      __typename?: "God";
      image?: { __typename?: "Image"; path: string } | null;
    };
    trial: {
      __typename?: "Trial";
      name: string;
      image: { __typename?: "Image"; path: string };
    };
  } | null;
};

export const GetCombatStatsDocument = gql`
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

/**
 * __useGetCombatStatsQuery__
 *
 * To run a query within a React component, call `useGetCombatStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCombatStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCombatStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCombatStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCombatStatsQuery,
    GetCombatStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCombatStatsQuery, GetCombatStatsQueryVariables>(
    GetCombatStatsDocument,
    options
  );
}
export function useGetCombatStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCombatStatsQuery,
    GetCombatStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCombatStatsQuery, GetCombatStatsQueryVariables>(
    GetCombatStatsDocument,
    options
  );
}
export function useGetCombatStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCombatStatsQuery,
        GetCombatStatsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCombatStatsQuery,
    GetCombatStatsQueryVariables
  >(GetCombatStatsDocument, options);
}
export type GetCombatStatsQueryHookResult = ReturnType<
  typeof useGetCombatStatsQuery
>;
export type GetCombatStatsLazyQueryHookResult = ReturnType<
  typeof useGetCombatStatsLazyQuery
>;
export type GetCombatStatsSuspenseQueryHookResult = ReturnType<
  typeof useGetCombatStatsSuspenseQuery
>;
export type GetCombatStatsQueryResult = Apollo.QueryResult<
  GetCombatStatsQuery,
  GetCombatStatsQueryVariables
>;
export const CombatDocument = gql`
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

/**
 * __useCombatQuery__
 *
 * To run a query within a React component, call `useCombatQuery` and pass it any options that fit your needs.
 * When your component renders, `useCombatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCombatQuery({
 *   variables: {
 *      combatId: // value for 'combatId'
 *   },
 * });
 */
export function useCombatQuery(
  baseOptions: Apollo.QueryHookOptions<CombatQuery, CombatQueryVariables> &
    ({ variables: CombatQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CombatQuery, CombatQueryVariables>(
    CombatDocument,
    options
  );
}
export function useCombatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CombatQuery, CombatQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CombatQuery, CombatQueryVariables>(
    CombatDocument,
    options
  );
}
export function useCombatSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<CombatQuery, CombatQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CombatQuery, CombatQueryVariables>(
    CombatDocument,
    options
  );
}
export type CombatQueryHookResult = ReturnType<typeof useCombatQuery>;
export type CombatLazyQueryHookResult = ReturnType<typeof useCombatLazyQuery>;
export type CombatSuspenseQueryHookResult = ReturnType<
  typeof useCombatSuspenseQuery
>;
export type CombatQueryResult = Apollo.QueryResult<
  CombatQuery,
  CombatQueryVariables
>;
