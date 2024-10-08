import * as React from 'react';
import { TodoStatus, TodoTab } from '../../types/todo';
import {
  useDeleteTodoMutation,
  useFetchTodosQuery,
  useUpdateTodoMutation,
} from '../../store/todo-api';
import './styles.scss';

interface Props {
  activeTab: TodoTab;
}

const TodoList = ({ activeTab }: Props) => {
  const { data: todos = [], isLoading } = useFetchTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const status = e.target.checked
      ? TodoStatus.COMPLETED
      : TodoStatus.INCOMPLETE;

    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;
    updateTodo({
      ...todo,
      status,
    });
  };

  const showTodos = todos.filter((todo) => {
    switch (activeTab) {
      case TodoTab.INCOMPLETE:
        return todo.status === TodoStatus.INCOMPLETE;
      case TodoTab.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  if (isLoading) {
    return <p className="todo-list__loading">Loading...</p>;
  }
  return (
    <div className="todo-list">
      {showTodos.length ? (
        showTodos.map((todo) => {
          return (
            <div key={todo.id} className="todo-list__item">
              <div className="todo-list__item__section">
                <input
                  type="checkbox"
                  checked={todo?.status === TodoStatus.COMPLETED}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                <span>{todo.content}</span>
              </div>

              <button
                className="todo-list__delete"
                onClick={() => deleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })
      ) : (
        <p className="todo-list__empty">List is empty</p>
      )}
    </div>
  );
};

export default TodoList;
