import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Test from "./pages/Home/Test";
import Admin from "./pages/Admin/Admin";
import ProductInfo from "./pages/ProductInfo/ProductInfo";


function App() {



  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Navbar />

   <BrowserRouter>
   <Routes>
   {/* <Route path="/test" element={<Test />}/> */}
   <Route path="/" element={<Home />}/>
   <Route path="/product/:id" element={<ProductInfo />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/user-profile" element={<Profile />}/>
    <Route path="/admin" element={<Admin />}/>
   </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
