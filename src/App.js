import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Todo from "./components/todo/Todo";

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
