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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    