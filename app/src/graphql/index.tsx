import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type Query = {
  __typename: 'Query';
  albums: Array<Album>;
  album?: Maybe<Album>;
  tracks: Array<Track>;
  track?: Maybe<Track>;
  users: Array<User>;
  user?: Maybe<User>;
};


export type QueryAlbumsArgs = {
  id?: Maybe<Array<Scalars['String']>>;
  createdBy?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Array<Scalars['String']>>;
};


export type QueryAlbumArgs = {
  id?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryTracksArgs = {
  maxDuration?: Maybe<Scalars['Float']>;
  id?: Maybe<Array<Scalars['String']>>;
  uploadedBy?: Maybe<Array<Scalars['String']>>;
  albumId?: Maybe<Array<Scalars['String']>>;
  fileName?: Maybe<Array<Scalars['String']>>;
};


export type QueryTrackArgs = {
  id?: Maybe<Scalars['String']>;
  uploadedBy?: Maybe<Scalars['String']>;
  albumId?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  id?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Array<Scalars['String']>>;
  email?: Maybe<Array<Scalars['String']>>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Album = {
  __typename: 'Album';
  name: Scalars['String'];
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  modifiedBy: Array<User>;
  tracks: Array<Track>;
};

export type User = {
  __typename: 'User';
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Track = {
  __typename: 'Track';
  assetName: Scalars['String'];
  fileName: Scalars['String'];
  mimeType: Scalars['String'];
  fileSize: Scalars['Int'];
  duration: Scalars['Float'];
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  uploadedBy?: Maybe<User>;
  album?: Maybe<Album>;
};

export type Mutation = {
  __typename: 'Mutation';
  insertAlbum: Album;
  insertTrack: Track;
  upsertUser: User;
};


export type MutationInsertAlbumArgs = {
  album: AlbumInsertInput;
};


export type MutationInsertTrackArgs = {
  track: TrackInsertInput;
};


export type MutationUpsertUserArgs = {
  user: UserUpsertInput;
};

export type AlbumInsertInput = {
  name: Scalars['String'];
};

export type TrackInsertInput = {
  albumId: Scalars['String'];
  file: Scalars['Upload'];
};


export type UserUpsertInput = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};

export type UpsertUserMutationVariables = Exact<{
  user: UserUpsertInput;
}>;


export type UpsertUserMutation = (
  { __typename: 'Mutation' }
  & { user: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'image'>
  ) }
);

export type AlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AlbumQuery = (
  { __typename: 'Query' }
  & { album?: Maybe<(
    { __typename: 'Album' }
    & Pick<Album, 'id' | 'name' | 'createdAt'>
    & { createdBy?: Maybe<(
      { __typename: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  )> }
);

export type AlbumFragment = (
  { __typename: 'Album' }
  & Pick<Album, 'id' | 'name' | 'createdAt'>
  & { createdBy?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )>, tracks: Array<(
    { __typename: 'Track' }
    & Pick<Track, 'id'>
  )> }
);

export type AlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type AlbumsQuery = (
  { __typename: 'Query' }
  & { albums: Array<(
    { __typename: 'Album' }
    & AlbumFragment
  )> }
);

export type CreateAlbumMutationVariables = Exact<{
  album: AlbumInsertInput;
}>;


export type CreateAlbumMutation = (
  { __typename: 'Mutation' }
  & { insertAlbum: (
    { __typename: 'Album' }
    & AlbumFragment
  ) }
);

export type TrackQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TrackQuery = (
  { __typename: 'Query' }
  & { track?: Maybe<(
    { __typename: 'Track' }
    & Pick<Track, 'id' | 'createdAt' | 'fileName' | 'fileSize' | 'duration'>
    & { album?: Maybe<(
      { __typename: 'Album' }
      & Pick<Album, 'id' | 'name'>
    )>, uploadedBy?: Maybe<(
      { __typename: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )> }
  )> }
);

export type TrackFragment = (
  { __typename: 'Track' }
  & Pick<Track, 'id' | 'createdAt' | 'assetName' | 'fileName' | 'fileSize' | 'duration'>
  & { album?: Maybe<(
    { __typename: 'Album' }
    & Pick<Album, 'id' | 'name'>
  )>, uploadedBy?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);

export type TracksQueryVariables = Exact<{ [key: string]: never; }>;


export type TracksQuery = (
  { __typename: 'Query' }
  & { albums: Array<(
    { __typename: 'Album' }
    & Pick<Album, 'id' | 'name'>
  )>, tracks: Array<(
    { __typename: 'Track' }
    & TrackFragment
  )> }
);

export type CreateTrackMutationVariables = Exact<{
  track: TrackInsertInput;
}>;


export type CreateTrackMutation = (
  { __typename: 'Mutation' }
  & { insertTrack: (
    { __typename: 'Track' }
    & TrackFragment
  ) }
);

export const AlbumFragmentDoc = gql`
    fragment Album on Album {
  id
  name
  createdAt
  createdBy {
    id
    name
    email
  }
  tracks {
    id
  }
}
    `;
export const TrackFragmentDoc = gql`
    fragment Track on Track {
  id
  createdAt
  assetName
  fileName
  fileSize
  duration
  album {
    id
    name
  }
  uploadedBy {
    id
    name
    email
  }
}
    `;
export const UpsertUserDocument = gql`
    mutation UpsertUser($user: UserUpsertInput!) {
  user: upsertUser(user: $user) {
    id
    name
    email
    image
  }
}
    `;
export type UpsertUserMutationFn = Apollo.MutationFunction<UpsertUserMutation, UpsertUserMutationVariables>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpsertUserMutation(baseOptions?: Apollo.MutationHookOptions<UpsertUserMutation, UpsertUserMutationVariables>) {
        return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(UpsertUserDocument, baseOptions);
      }
export type UpsertUserMutationHookResult = ReturnType<typeof useUpsertUserMutation>;
export type UpsertUserMutationResult = Apollo.MutationResult<UpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<UpsertUserMutation, UpsertUserMutationVariables>;
export const AlbumDocument = gql`
    query Album($id: String!) {
  album(id: $id) {
    id
    name
    createdAt
    createdBy {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useAlbumQuery__
 *
 * To run a query within a React component, call `useAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAlbumQuery(baseOptions: Apollo.QueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
        return Apollo.useQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
      }
export function useAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
          return Apollo.useLazyQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
        }
export type AlbumQueryHookResult = ReturnType<typeof useAlbumQuery>;
export type AlbumLazyQueryHookResult = ReturnType<typeof useAlbumLazyQuery>;
export type AlbumQueryResult = Apollo.QueryResult<AlbumQuery, AlbumQueryVariables>;
export const AlbumsDocument = gql`
    query Albums {
  albums {
    ...Album
  }
}
    ${AlbumFragmentDoc}`;

/**
 * __useAlbumsQuery__
 *
 * To run a query within a React component, call `useAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
        return Apollo.useQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
      }
export function useAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
          return Apollo.useLazyQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
        }
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsLazyQueryHookResult = ReturnType<typeof useAlbumsLazyQuery>;
export type AlbumsQueryResult = Apollo.QueryResult<AlbumsQuery, AlbumsQueryVariables>;
export const CreateAlbumDocument = gql`
    mutation createAlbum($album: AlbumInsertInput!) {
  insertAlbum(album: $album) {
    ...Album
  }
}
    ${AlbumFragmentDoc}`;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      album: // value for 'album'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: Apollo.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, baseOptions);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const TrackDocument = gql`
    query Track($id: String!) {
  track(id: $id) {
    id
    createdAt
    fileName
    fileSize
    duration
    album {
      id
      name
    }
    uploadedBy {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useTrackQuery__
 *
 * To run a query within a React component, call `useTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrackQuery(baseOptions: Apollo.QueryHookOptions<TrackQuery, TrackQueryVariables>) {
        return Apollo.useQuery<TrackQuery, TrackQueryVariables>(TrackDocument, baseOptions);
      }
export function useTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackQuery, TrackQueryVariables>) {
          return Apollo.useLazyQuery<TrackQuery, TrackQueryVariables>(TrackDocument, baseOptions);
        }
export type TrackQueryHookResult = ReturnType<typeof useTrackQuery>;
export type TrackLazyQueryHookResult = ReturnType<typeof useTrackLazyQuery>;
export type TrackQueryResult = Apollo.QueryResult<TrackQuery, TrackQueryVariables>;
export const TracksDocument = gql`
    query Tracks {
  albums {
    id
    name
  }
  tracks {
    ...Track
  }
}
    ${TrackFragmentDoc}`;

/**
 * __useTracksQuery__
 *
 * To run a query within a React component, call `useTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTracksQuery(baseOptions?: Apollo.QueryHookOptions<TracksQuery, TracksQueryVariables>) {
        return Apollo.useQuery<TracksQuery, TracksQueryVariables>(TracksDocument, baseOptions);
      }
export function useTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TracksQuery, TracksQueryVariables>) {
          return Apollo.useLazyQuery<TracksQuery, TracksQueryVariables>(TracksDocument, baseOptions);
        }
export type TracksQueryHookResult = ReturnType<typeof useTracksQuery>;
export type TracksLazyQueryHookResult = ReturnType<typeof useTracksLazyQuery>;
export type TracksQueryResult = Apollo.QueryResult<TracksQuery, TracksQueryVariables>;
export const CreateTrackDocument = gql`
    mutation CreateTrack($track: TrackInsertInput!) {
  insertTrack(track: $track) {
    ...Track
  }
}
    ${TrackFragmentDoc}`;
export type CreateTrackMutationFn = Apollo.MutationFunction<CreateTrackMutation, CreateTrackMutationVariables>;

/**
 * __useCreateTrackMutation__
 *
 * To run a mutation, you first call `useCreateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackMutation, { data, loading, error }] = useCreateTrackMutation({
 *   variables: {
 *      track: // value for 'track'
 *   },
 * });
 */
export function useCreateTrackMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrackMutation, CreateTrackMutationVariables>) {
        return Apollo.useMutation<CreateTrackMutation, CreateTrackMutationVariables>(CreateTrackDocument, baseOptions);
      }
export type CreateTrackMutationHookResult = ReturnType<typeof useCreateTrackMutation>;
export type CreateTrackMutationResult = Apollo.MutationResult<CreateTrackMutation>;
export type CreateTrackMutationOptions = Apollo.BaseMutationOptions<CreateTrackMutation, CreateTrackMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    