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
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
  opponentCombats: Array<Combat>;
  playerCombats: Array<Combat>;
  profession: Profession;
  status: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type God = {
  __typename?: "God";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
  opponentGodCombats: Array<Combat>;
  playerGodCombats: Array<Combat>;
};

export type Image = {
  __typename?: "Image";
  id?: Maybe<Scalars["Float"]["output"]>;
  path: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Modifier = {
  __typename?: "Modifier";
  id: Scalars["Float"]["output"];
  label: Scalars["String"]["output"];
  modifier: Array<ModifierAssignment>;
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
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ProfessionModifiers>>;
  name: Scalars["String"]["output"];
};

export type ProfessionModifiers = {
  __typename?: "ProfessionModifiers";
  id?: Maybe<Scalars["String"]["output"]>;
  modifierLabel: Scalars["String"]["output"];
  value: Scalars["Float"]["output"];
  valueType: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  combats: Array<Combat>;
  getCompetitor: Array<Competitor>;
  getGod: Array<God>;
  professions: Array<Profession>;
};

export type Trial = {
  __typename?: "Trial";
  combats: Combat;
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Array<Image>;
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

export type GetProfessionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfessionsQuery = {
  __typename?: "Query";
  professions: Array<{
    __typename?: "Profession";
    name: string;
    id: string;
    description: string;
    image: { __typename?: "Image"; path: string };
    modifierAssignments?: Array<{
      __typename?: "ProfessionModifiers";
      modifierLabel: string;
      valueType: string;
      value: number;
    }> | null;
  }>;
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
export const GetProfessionsDocument = gql`
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

/**
 * __useGetProfessionsQuery__
 *
 * To run a query within a React component, call `useGetProfessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfessionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProfessionsQuery,
    GetProfessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfessionsQuery, GetProfessionsQueryVariables>(
    GetProfessionsDocument,
    options
  );
}
export function useGetProfessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfessionsQuery,
    GetProfessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfessionsQuery, GetProfessionsQueryVariables>(
    GetProfessionsDocument,
    options
  );
}
export function useGetProfessionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProfessionsQuery,
        GetProfessionsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProfessionsQuery,
    GetProfessionsQueryVariables
  >(GetProfessionsDocument, options);
}
export type GetProfessionsQueryHookResult = ReturnType<
  typeof useGetProfessionsQuery
>;
export type GetProfessionsLazyQueryHookResult = ReturnType<
  typeof useGetProfessionsLazyQuery
>;
export type GetProfessionsSuspenseQueryHookResult = ReturnType<
  typeof useGetProfessionsSuspenseQuery
>;
export type GetProfessionsQueryResult = Apollo.QueryResult<
  GetProfessionsQuery,
  GetProfessionsQueryVariables
>;
