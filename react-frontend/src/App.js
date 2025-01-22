import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./layouts/authentication/sign-up"
function App() {
  return (
   <Routes>
    <Route path="/" element={<SignUp />}/>
   </Routes>
  );
}

export default App;
