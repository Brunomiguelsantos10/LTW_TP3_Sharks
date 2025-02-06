import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AdminSharks from "./pages/AdminSharks.jsx";
import NewShark from "./pages/NewShark.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/sharks" element={<AdminSharks />} />
        <Route path="/admin/sharks/novo" element={<NewShark />} />
      </Routes>
    </BrowserRouter>
  );
}
