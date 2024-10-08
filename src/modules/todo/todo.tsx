import React, { useState } from 'react';

import './styles.scss';
import { TodoTab } from '../../types/todo';
import TodoToolbar from './todo-toolbar';
import TodoCreation from './todo-creation';
import TodoList from './todo-list';

const ModuleTodo = () => {
  const [activeTab, setActiveTab] = useState<TodoTab>(TodoTab.ALL);

  return (
    <main className="todo-container">
      <article className="todo-container__box">
        <h1>To-Do List</h1>
        <TodoCreation />
        <TodoToolbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <TodoList activeTab={activeTab} />
      </article>
    </main>
  );
};

export default ModuleTodo;
