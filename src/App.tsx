import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import Main from './main';
import Detail from './detail';
import Footer from './footer';

//1. useState - state
//2. props
//3. zustand

function App() {

  return (
    <div>

        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
          <Footer />
        </BrowserRouter>

    </div>
  )
  
}

export default App;
