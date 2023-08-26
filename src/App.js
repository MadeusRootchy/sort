import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import UrlForm from './urlform';
import Redirection from './setup';

function App() {
  return (
    <div className="App">
      <h2>URL SHORTENER</h2>
      
        <Routes>
          <Route path="/" element={<UrlForm />} />
          <Route path="/r/:shortUrl" element={<Redirection />} />
        </Routes>
    
    </div>
  );
}

export default App;
