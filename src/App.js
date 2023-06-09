import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Todo from "./components/Todo";

function App() {
  return (
   <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/todo" element={<Todo />} />
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
