import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import './App.css';
import IlanList from "./pages/Ilanlar";
import Admin from "./pages/Admin";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      <Toaster toastOptions={{ duration: "300" }} position="top-right"/>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/admin-l" element={<Login/>}></Route>
        <Route path="/admin-r" element={<Register/>}></Route>
        <Route path="/ilanlar" element={<IlanList/>}></Route>
        <Route path="/admin/*" element={<Admin/>}></Route>
      </Routes>
    </>
  );
}

export default App;
