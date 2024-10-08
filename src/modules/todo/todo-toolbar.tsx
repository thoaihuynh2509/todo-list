import * as React from 'react';

import './styles.scss';
import {
  useFetchTodosQuery,
  useUpdateTodoMutation,
} from '../../store/todo-api';
import { TodoStatus, TodoTab } from '../../types/todo';

interface Props {
  activeTab: TodoTab;
  setActiveTab: (tab: TodoTab) => void;
}

const TodoToolbar = ({ activeTab, setActiveTab }: Props) => {
  const { data: todos = [] } = useFetchTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked
      ? TodoStatus.COMPLETED
      : TodoStatus.INCOMPLETE;

    todos.forEach((todo) => {
      updateTodo({
        ...todo,
        status,
      });
    });
  };

  const activeTodos = todos.reduce(function (acc, todo) {
    return todo.status === TodoStatus.COMPLETED ? acc : acc + 1;
  }, 0);

  return (
    <div className="todo-toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
          disabled={activeTab !== TodoTab.ALL}
          data-testid="toggle-all-checkbox"
        />
      ) : (
        <div />
      )}
      <div className="todo-toolbar__tabs">
        <div className="todo-toolbar__tab">
          <button
            className={`todo-action__btn ${
              activeTab === TodoTab.ALL && 'todo-action__btn--focus'
            }`}
            onClick={() => setActiveTab(TodoTab.ALL)}
            data-testid="all-tab-btn"
          >
            All
          </button>
        </div>
        <div className="todo-toolbar__tab">
          <button
            className={`todo-action__btn ${
              activeTab === TodoTab.COMPLETED && 'todo-action__btn--focus'
            }`}
            onClick={() => setActiveTab(TodoTab.COMPLETED)}
            data-testid="completed-tab-btn"
          >
            Completed
          </button>
        </div>
        <div className="todo-toolbar__tab">
          <button
            className={`todo-action__btn ${
              activeTab === TodoTab.INCOMPLETE && 'todo-action__btn--focus'
            }`}
            onClick={() => setActiveTab(TodoTab.INCOMPLETE)}
            data-testid="incomplete-tab-btn"
          >
            Incomplete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoToolbar;
