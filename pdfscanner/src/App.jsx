import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, HashRouter,Navigate } from "react-router-dom";

import { AuthProvider } from './Components/Auth/AuthContext';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import './App.css'
import Userinput from './Components/User/Userinput';
import Searchuser from './Components/User/Searchuser';
import MultiInput from './Components/User/MultiInput';
import Register from './Components/User/Register';
import Login from './Components/Login';
import Home from './Components/User/Home';
import ViewAll from './Components/User/Viewall';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);


  return (
    <>

    <HashRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Userinput />} />

          <Route path="/search" element={<Searchuser />} />
          {/* <Route path="/multi" element={<MultiInput />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/viewall" element={<ViewAll />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="*" element={<Navigate to="/home" />} />

        </Routes>
      </HashRouter>

    </>
  )
}

export default App




// import React, { useEffect, useState } from 'react';

// import { BrowserRouter, Routes, Route, HashRouter, Navigate } from "react-router-dom";

// import { AuthProvider } from './Components/Auth/AuthContext';
// import ProtectedRoute from './Components/Auth/ProtectedRoute';
// import './App.css'
// import Userinput from './Components/User/Userinput';
// import Searchuser from './Components/User/Searchuser';
// import MultiInput from './Components/User/MultiInput';
// import Register from './Components/User/Register';
// import Login from './Components/Login';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);


//   return (
//     <>

//       <HashRouter>
//         <Routes>
//           {!isLoggedIn ? (
//             <Route path="/" element={<Login />} />
//           ) : (
//             <>
//               <Route path="/" element={<Userinput />} />
//               <Route path="/search" element={<Searchuser />} />
//               <Route path="/multi" element={<MultiInput />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="*" element={<Navigate to="/search" />} />

//             </>
//           )}

//         </Routes>
//       </HashRouter>

//     </>
//   )
// }

// export default App
