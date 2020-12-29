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
};

export type Query = {
  __typename: 'Query';
  todos: Maybe<Array<Todo>>;
};

export type Todo = {
  __typename: 'Todo';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename: 'Mutation';
  addTodo: Todo;
};


export type MutationAddTodoArgs = {
  todoInput: TodoInput;
};

export type TodoInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename: 'Query' }
  & { todos: Maybe<Array<(
    { __typename: 'Todo' }
    & Pick<Todo, 'id' | 'title'>
  )>> }
);


export const TodosDocument = gql`
    query Todos {
  todos {
    id
    title
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        return Apollo.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
      }
export function useTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = Apollo.QueryResult<TodosQuery, TodosQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    