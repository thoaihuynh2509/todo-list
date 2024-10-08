import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import TodoCreation from '../todo-creation';
import store from '../../../store';

describe('TodoCreation Component', () => {
  test('renders input field', () => {
    render(
      <Provider store={store}>
        <TodoCreation />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/What need to be done?/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('creates todo on Enter key press', async () => {
    render(
      <Provider store={store}>
        <TodoCreation />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText(/What need to be done?/i);

    fireEvent.change(inputElement, { target: { value: 'New Todo Item' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    // Assert that the input is cleared
    expect(inputElement).toHaveValue('');
  });
});
