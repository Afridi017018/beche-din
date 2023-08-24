import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Navbar />
    <Profile />
   <BrowserRouter>
   <Routes>
    
   <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
  
   </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
