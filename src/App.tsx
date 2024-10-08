import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import PageTodo from './pages/todo';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<PageTodo />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
