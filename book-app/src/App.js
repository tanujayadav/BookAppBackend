import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupForm from './Components/SignupForm';
import Login from './Components/Login';
import ViewBooks from './Components/ViewBooks';
import AdminViewBooks from './Components/AdminViewBooks';
import BooksForm from './Components/BooksForm';

function App() {

  const [role,setRole] = useState(null);
  const role1=localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignupForm />} />
        <Route path="/login" element={<Login setRole={setRole}/>} />
        <Route path="/book-form" element={<BooksForm/>} />
        <Route path="/Books" element={role==="Admin" || role1==="Admin" ?<AdminViewBooks/>: <ViewBooks/>}></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
