import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TodoStatus, TodoTab } from '../../../types/todo';
import TodoToolbar from '../todo-toolbar';

// Mock the API hooks
const mockFetchTodosQuery = jest.fn();
const mockUpdateTodoMutation = jest.fn();

jest.mock('../../../store/todo-api', () => ({
  useFetchTodosQuery: () => mockFetchTodosQuery(),
  useUpdateTodoMutation: () => [mockUpdateTodoMutation],
}));

// Configure a mock store
const store = configureStore({
  reducer: {
    // Assuming your slice is named 'todosApi'
    todosApi: (state = {}) => state,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

describe('TodoToolbar Component', () => {
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
  });

  test('renders toggle all checkbox and tabs', () => {
    const setActiveTab = jest.fn();

    render(
      <Provider store={store}>
        <TodoToolbar activeTab={TodoTab.ALL} setActiveTab={setActiveTab} />
      </Provider>
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Incomplete')).toBeInTheDocument();
  });

  test('toggles all todos when checkbox is clicked', async () => {
    const setActiveTab = jest.fn();

    render(
      <Provider store={store}>
        <TodoToolbar activeTab={TodoTab.ALL} setActiveTab={setActiveTab} />
      </Provider>
    );

    const toggleAllCheckbox = screen.getByTestId('toggle-all-checkbox');
    await userEvent.click(toggleAllCheckbox);

    expect(mockUpdateTodoMutation).toHaveBeenCalledTimes(2);
    expect(mockUpdateTodoMutation).toHaveBeenCalledWith({
      content: 'Learn React',
      status: TodoStatus.COMPLETED,
      created_date: '2023-10-01T12:34:56Z',
      user_id: 'firstUser',
      id: '1',
    });
    expect(mockUpdateTodoMutation).toHaveBeenCalledWith({
      content: 'Write tests',
      status: TodoStatus.COMPLETED,
      created_date: '2023-10-02T08:45:23Z',
      user_id: 'firstUser',
      id: '2',
    });
  });
});
