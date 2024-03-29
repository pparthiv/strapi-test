import React from 'react';
import Posts from './pages/posts';
import { Routes, Route } from 'react-router-dom';
import EditPost from './pages/editPost';
import CreatePost from './pages/createPost';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Posts/>}></Route>
      <Route path="/new" element={<CreatePost />}></Route>
      <Route path="/edit/:id" element={<EditPost />}></Route>
    </Routes>
  )
}

export default App
