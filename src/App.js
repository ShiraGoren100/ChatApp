import React from 'react';
import './App.css';
import Login from './components/LoginForm';
import Register from './components/registrationForm'
import Chat from './components/chatForm'
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'



function App() {

  return (
      
      <div className="ReactFormApp">
     
      <BrowserRouter>
      <Routes>
      <Route path = '/' element={<Login />}></Route>
      <Route path = '/register' element = {<Register/>}></Route>
      <Route path = '/chat' element = {<Chat/>}></Route>
      </Routes>
     
      </BrowserRouter>
      
     
    </div>
  );
}


export default App;
