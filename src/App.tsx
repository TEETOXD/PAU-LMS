import { Routes, Route } from 'react-router-dom';
import PAUSettingsPage from "./PAUSettingsPage";
import PAUDisplayPage from "./PAUDisplayPage";
import PAUDashboard from "./PAUDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PAUSettingsPage />} />
      <Route path="/display" element={<PAUDisplayPage />} />
      <Route path="/dashboard" element={<PAUDashboard />} />
    </Routes>
  );
}

export default App;