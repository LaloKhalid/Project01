import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Companies from "./pages/Companies";
import MainLayout from "./layouts/Mainlayout";

function App() {
  return(
    <BrowserRouter>
      <Routes>
         <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/companies" element={<Companies />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;