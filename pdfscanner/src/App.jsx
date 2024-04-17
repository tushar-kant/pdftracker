import { useState } from 'react'
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import './App.css'
import Userinput from './Components/User/Userinput';
import Searchuser from './Components/User/Searchuser';

function App() {

  return (
    <>
    
    <HashRouter>
        <Routes>
          <Route path="/" element={<Userinput />} />
          {/* <Route path="/" element={<Searchuser />} /> */}

         
        </Routes>
      </HashRouter>

    </>
  )
}

export default App
