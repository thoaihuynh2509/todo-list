import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoList from '../todo-list';
import { TodoStatus, TodoTab } from '../../../types/todo';

// Mock the API hooks
const mockFetchTodosQuery = jest.fn();
const mockUpdateTodoMutation = jest.fn();
const mockDeleteTodoMutation = jest.fn();

jest.mock('../../../store/todo-api', () => ({
  useFetchTodosQuery: () => mockFetchTodosQuery(),
  useUpdateTodoMutation: () => [mockUpdateTodoMutation],
  useDeleteTodoMutation: () => [mockDeleteTodoMutation],
}));

// Configure a mock store
const store = configureStore({
  reducer: {
    // Assuming your slice is named 'todosApi'
    todosApi: (state = {}) => state,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

describe('TodoList Component', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    mockFetchTodosQuery.mockImplementation(() => ({
      data: [
        {
          content: 'Learn React',
          status: TodoStatus.INCOMPLETE,
          created_date: '2023-10-01T12:34:56Z',
          user_id: 'firstUser',
          id: '1',
        },
        {
          content: 'Write tests',
          status: TodoStatus.COMPLETED,
          created_date: '2023-10-02T08:45:23Z',
          user_id: 'firstUser',
          id: '2',
        },
      ],
      isLoading: false,
    }));
    mockUpdateTodoMutation.mockClear();
    mockDeleteTodoMutation.mockClear();
  });

  test('renders loading state', () => {
    mockFetchTodosQuery.mockImplementationOnce(() => ({
      data: [],
      isLoading: true,
    }));

    render(
      <Provider store={store}>
        <TodoList activeTab={TodoTab.ALL} />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders todos based on all tab', () => {
    render(
      <Provider store={store}>
        <TodoList activeTab={TodoTab.ALL} />
      </Provider>
    );

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('updates todo status', async () => {
    render(
      <Provider store={store}>
        <TodoList activeTab={TodoTab.ALL} />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(checkbox);

    await waitFor(() => {
      expect(mockUpdateTodoMutation).toHaveBeenCalledWith({
        content: 'Learn React',
        status: TodoStatus.COMPLETED,
        created_date: '2023-10-01T12:34:56Z',
        user_id: 'firstUser',
        id: '1',
      });
    });
  });

  test('deletes a todo', async () => {
    render(
      <Provider store={store}>
        <TodoList activeTab={TodoTab.ALL} />
      </Provider>
    );

    const deleteButton = screen.getAllByText('X', { selector: 'button' })[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTodoMutation).toHaveBeenCalledWith('1');
    });
  });
});
