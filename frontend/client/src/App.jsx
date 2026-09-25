import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Applications from "./pages/Applications";
import Companies from "./pages/Companies";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/companies" element={<Companies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
