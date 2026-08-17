import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiteDataProvider } from "@/lib/site-data";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <SiteDataProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </SiteDataProvider>
  );
}
