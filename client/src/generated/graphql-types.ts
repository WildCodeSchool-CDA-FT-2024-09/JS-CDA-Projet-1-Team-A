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
  avatarImage?: Maybe<Image>;
  battleImage: Image;
  createdAt: Scalars["DateTimeISO"]["output"];
  god?: Maybe<God>;
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
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<ModifierAssignment>>;
  name: Scalars["String"]["output"];
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
  competitors: Array<Competitor>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<ProfessionModifiers>>;
  name?: Maybe<Scalars["String"]["output"]>;
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
  combat?: Maybe<Combat>;
  combats: Array<Combat>;
  competitor: Competitor;
  competitors: Array<Competitor>;
  getGod: Array<God>;
  getImage: Array<Image>;
  getTrial: Array<Trial>;
  professions: Array<Profession>;
};

export type QueryCombatArgs = {
  id: Scalars["String"]["input"];
};

export type QueryCompetitorArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetImageArgs = {
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type TemporaryCompetitor = {
  __typename?: "TemporaryCompetitor";
  avatarImage?: Maybe<Image>;
  battleImage: Image;
  createdAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
  god?: Maybe<God>;
  id: Scalars["String"]["output"];
  image?: Maybe<Image>;
  modifierAssignments?: Maybe<Array<CompetitorModifiers>>;
  name: Scalars["String"]["output"];
  profession?: Maybe<Profession>;
  status: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTimeISO"]["output"]>;
};

export type Trial = {
  __typename?: "Trial";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  image: Image;
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
    profession?: {
      __typename?: "Profession";
      id: string;
      name?: string | null;
    } | null;
    image?: { __typename?: "Image"; id?: number | null; path: string } | null;
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
      image?: { __typename?: "Image"; path: string } | null;
    };
    playerGod: {
      __typename?: "God";
      name: string;
      image?: { __typename?: "Image"; path: string } | null;
    };
    opponent: {
      __typename?: "Competitor";
      name: string;
      image?: { __typename?: "Image"; path: string } | null;
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

export type GetGodimageQueryVariables = Exact<{ [key: string]: never }>;

export type GetGodimageQuery = {
  __typename?: "Query";
  getGod: Array<{
    __typename?: "God";
    image?: { __typename?: "Image"; path: string } | null;
  }>;
};

export type GetImageFiltreQueryVariables = Exact<{
  type: Scalars["String"]["input"];
}>;

export type GetImageFiltreQuery = {
  __typename?: "Query";
  getImage: Array<{ __typename?: "Image"; path: string; type?: string | null }>;
};

export type GetTrialQueryVariables = Exact<{ [key: string]: never }>;

export type GetTrialQuery = {
  __typename?: "Query";
  getTrial: Array<{
    __typename?: "Trial";
    description: string;
    name: string;
    image: { __typename?: "Image"; path: string };
  }>;
};

export type GetProfessionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfessionsQuery = {
  __typename?: "Query";
  professions: Array<{
    __typename?: "Profession";
    name?: string | null;
    id: string;
    description?: string | null;
    image?: { __typename?: "Image"; path: string } | null;
    modifierAssignments?: Array<{
      __typename?: "ProfessionModifiers";
      modifierLabel: string;
      valueType: string;
      value: number;
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
export const GetGodimageDocument = gql`
  query GetGodimage {
    getGod {
      image {
        path
      }
    }
  }
`;

/**
 * __useGetGodimageQuery__
 *
 * To run a query within a React component, call `useGetGodimageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGodimageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGodimageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGodimageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGodimageQuery,
    GetGodimageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetGodimageQuery, GetGodimageQueryVariables>(
    GetGodimageDocument,
    options
  );
}
export function useGetGodimageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGodimageQuery,
    GetGodimageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetGodimageQuery, GetGodimageQueryVariables>(
    GetGodimageDocument,
    options
  );
}
export function useGetGodimageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetGodimageQuery,
        GetGodimageQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetGodimageQuery, GetGodimageQueryVariables>(
    GetGodimageDocument,
    options
  );
}
export type GetGodimageQueryHookResult = ReturnType<typeof useGetGodimageQuery>;
export type GetGodimageLazyQueryHookResult = ReturnType<
  typeof useGetGodimageLazyQuery
>;
export type GetGodimageSuspenseQueryHookResult = ReturnType<
  typeof useGetGodimageSuspenseQuery
>;
export type GetGodimageQueryResult = Apollo.QueryResult<
  GetGodimageQuery,
  GetGodimageQueryVariables
>;
export const GetImageFiltreDocument = gql`
  query GetImageFiltre($type: String!) {
    getImage(type: $type) {
      path
      type
    }
  }
`;

/**
 * __useGetImageFiltreQuery__
 *
 * To run a query within a React component, call `useGetImageFiltreQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImageFiltreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImageFiltreQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetImageFiltreQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetImageFiltreQuery,
    GetImageFiltreQueryVariables
  > &
    (
      | { variables: GetImageFiltreQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetImageFiltreQuery, GetImageFiltreQueryVariables>(
    GetImageFiltreDocument,
    options
  );
}
export function useGetImageFiltreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetImageFiltreQuery,
    GetImageFiltreQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetImageFiltreQuery, GetImageFiltreQueryVariables>(
    GetImageFiltreDocument,
    options
  );
}
export function useGetImageFiltreSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetImageFiltreQuery,
        GetImageFiltreQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetImageFiltreQuery,
    GetImageFiltreQueryVariables
  >(GetImageFiltreDocument, options);
}
export type GetImageFiltreQueryHookResult = ReturnType<
  typeof useGetImageFiltreQuery
>;
export type GetImageFiltreLazyQueryHookResult = ReturnType<
  typeof useGetImageFiltreLazyQuery
>;
export type GetImageFiltreSuspenseQueryHookResult = ReturnType<
  typeof useGetImageFiltreSuspenseQuery
>;
export type GetImageFiltreQueryResult = Apollo.QueryResult<
  GetImageFiltreQuery,
  GetImageFiltreQueryVariables
>;
export const GetTrialDocument = gql`
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

/**
 * __useGetTrialQuery__
 *
 * To run a query within a React component, call `useGetTrialQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrialQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrialQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTrialQuery, GetTrialQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTrialQuery, GetTrialQueryVariables>(
    GetTrialDocument,
    options
  );
}
export function useGetTrialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTrialQuery,
    GetTrialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTrialQuery, GetTrialQueryVariables>(
    GetTrialDocument,
    options
  );
}
export function useGetTrialSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetTrialQuery, GetTrialQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTrialQuery, GetTrialQueryVariables>(
    GetTrialDocument,
    options
  );
}
export type GetTrialQueryHookResult = ReturnType<typeof useGetTrialQuery>;
export type GetTrialLazyQueryHookResult = ReturnType<
  typeof useGetTrialLazyQuery
>;
export type GetTrialSuspenseQueryHookResult = ReturnType<
  typeof useGetTrialSuspenseQuery
>;
export type GetTrialQueryResult = Apollo.QueryResult<
  GetTrialQuery,
  GetTrialQueryVariables
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
