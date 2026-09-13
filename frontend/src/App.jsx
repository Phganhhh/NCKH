import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import ARExperience from "./pages/ARExperience/ARExperience.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ar" element={<ARExperience />} />
    </Routes>
  );
}
