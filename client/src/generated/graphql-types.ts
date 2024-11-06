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
  avatarImage?: Maybe<Image>;
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<CompetitorModifiers>>;
  name: Scalars["String"]["output"];
  profession?: Maybe<Profession>;
  status: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type CompetitorModifiers = {
  __typename?: "CompetitorModifiers";
  id?: Maybe<Scalars["String"]["output"]>;
  modifierLabel: Scalars["String"]["output"];
  value: Scalars["Float"]["output"];
  valueType: Scalars["String"]["output"];
};

export type God = {
  __typename?: "God";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type GodWithModifiers = {
  __typename?: "GodWithModifiers";
  modifierLabel?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  value?: Maybe<Scalars["Float"]["output"]>;
  valueType?: Maybe<Scalars["String"]["output"]>;
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

export type Mutation = {
  __typename?: "Mutation";
  createTemporaryCompetitor: TemporaryCompetitor;
  deleteTemporaryCompetitor: Scalars["Boolean"]["output"];
};

export type MutationDeleteTemporaryCompetitorArgs = {
  id: Scalars["String"]["input"];
};

export type Profession = {
  __typename?: "Profession";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Array<Image>;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  combats: Array<Combat>;
  competitor: Competitor;
  competitors: Array<Competitor>;
  getGods: Array<God>;
  getGodsWithModifiers: Array<GodWithModifiers>;
  getProfession: Array<Profession>;
};

export type QueryCompetitorArgs = {
  id: Scalars["String"]["input"];
};

export type TemporaryCompetitor = {
  __typename?: "TemporaryCompetitor";
  avatarImage?: Maybe<Image>;
  createdAt: Scalars["DateTimeISO"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<CompetitorModifiers>>;
  name: Scalars["String"]["output"];
  profession?: Maybe<Profession>;
  status: Scalars["String"]["output"];
  updatedAt: Scalars["DateTimeISO"]["output"];
};

export type Trial = {
  __typename?: "Trial";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Array<Image>;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
};

export type CreateTemporaryCompetitorMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateTemporaryCompetitorMutation = {
  __typename?: "Mutation";
  createTemporaryCompetitor: {
    __typename?: "TemporaryCompetitor";
    id: string;
    name: string;
    status: string;
    modifierAssignments?: Array<{
      __typename?: "CompetitorModifiers";
      modifierLabel: string;
      value: number;
      valueType: string;
    }> | null;
    profession?: { __typename?: "Profession"; id: string; name: string } | null;
    image?: { __typename?: "Image"; id: number; path: string } | null;
  };
};

export type DeleteTemporaryCompetitorMutationVariables = Exact<{
  deleteTemporaryCompetitorId: Scalars["String"]["input"];
}>;

export type DeleteTemporaryCompetitorMutation = {
  __typename?: "Mutation";
  deleteTemporaryCompetitor: boolean;
};

export type GetCombatStatsQueryVariables = Exact<{ [key: string]: never }>;

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

export const CreateTemporaryCompetitorDocument = gql`
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
export type CreateTemporaryCompetitorMutationFn = Apollo.MutationFunction<
  CreateTemporaryCompetitorMutation,
  CreateTemporaryCompetitorMutationVariables
>;

/**
 * __useCreateTemporaryCompetitorMutation__
 *
 * To run a mutation, you first call `useCreateTemporaryCompetitorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemporaryCompetitorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemporaryCompetitorMutation, { data, loading, error }] = useCreateTemporaryCompetitorMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateTemporaryCompetitorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTemporaryCompetitorMutation,
    CreateTemporaryCompetitorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTemporaryCompetitorMutation,
    CreateTemporaryCompetitorMutationVariables
  >(CreateTemporaryCompetitorDocument, options);
}
export type CreateTemporaryCompetitorMutationHookResult = ReturnType<
  typeof useCreateTemporaryCompetitorMutation
>;
export type CreateTemporaryCompetitorMutationResult =
  Apollo.MutationResult<CreateTemporaryCompetitorMutation>;
export type CreateTemporaryCompetitorMutationOptions =
  Apollo.BaseMutationOptions<
    CreateTemporaryCompetitorMutation,
    CreateTemporaryCompetitorMutationVariables
  >;
export const DeleteTemporaryCompetitorDocument = gql`
  mutation DeleteTemporaryCompetitor($deleteTemporaryCompetitorId: String!) {
    deleteTemporaryCompetitor(id: $deleteTemporaryCompetitorId)
  }
`;
export type DeleteTemporaryCompetitorMutationFn = Apollo.MutationFunction<
  DeleteTemporaryCompetitorMutation,
  DeleteTemporaryCompetitorMutationVariables
>;

/**
 * __useDeleteTemporaryCompetitorMutation__
 *
 * To run a mutation, you first call `useDeleteTemporaryCompetitorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemporaryCompetitorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemporaryCompetitorMutation, { data, loading, error }] = useDeleteTemporaryCompetitorMutation({
 *   variables: {
 *      deleteTemporaryCompetitorId: // value for 'deleteTemporaryCompetitorId'
 *   },
 * });
 */
export function useDeleteTemporaryCompetitorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTemporaryCompetitorMutation,
    DeleteTemporaryCompetitorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteTemporaryCompetitorMutation,
    DeleteTemporaryCompetitorMutationVariables
  >(DeleteTemporaryCompetitorDocument, options);
}
export type DeleteTemporaryCompetitorMutationHookResult = ReturnType<
  typeof useDeleteTemporaryCompetitorMutation
>;
export type DeleteTemporaryCompetitorMutationResult =
  Apollo.MutationResult<DeleteTemporaryCompetitorMutation>;
export type DeleteTemporaryCompetitorMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteTemporaryCompetitorMutation,
    DeleteTemporaryCompetitorMutationVariables
  >;
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
