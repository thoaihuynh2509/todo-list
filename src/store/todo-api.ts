import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoStatus } from '../types/todo';

export interface TodoState {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

// Define the API slice
export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }), // Adjust the base URL as needed
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    fetchTodos: builder.query<TodoState[], void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos', id }) as const),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    createTodo: builder.mutation<TodoState, Partial<TodoState>>({
      query: (newTodo) => ({
        url: '/tasks',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Todos', id }],
    }),
    updateTodo: builder.mutation<TodoState, Partial<TodoState>>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todos', id }],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
