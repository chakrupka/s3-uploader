import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Fallback from './components/Fallback';
import NewPost from './components/NewPost';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewPost />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
