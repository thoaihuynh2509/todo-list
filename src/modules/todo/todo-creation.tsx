import * as React from 'react';

import { useCreateTodoMutation } from '../../store/todo-api';
import { TodoStatus } from '../../types/todo';
import shortid from 'shortid';

import './styles.scss';

const TodoCreation = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [createTodo] = useCreateTodoMutation();

  const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
      createTodo({
        content: inputRef.current.value,
        created_date: new Date().toISOString(),
        status: TodoStatus.INCOMPLETE,
        id: shortid(),
        user_id: 'firstUser',
      });
      inputRef.current.value = '';
    }
  };

  return (
    <div className="todo-creation">
      <input
        ref={inputRef}
        className="todo-creation__input"
        placeholder="What need to be done?"
        onKeyDown={onCreateTodo}
      />
    </div>
  );
};

export default TodoCreation;
