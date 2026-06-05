import { Routes, Route } from 'react-router-dom';
import PAUHomePage from "./PAUHomePage";
import PAUSettingsPage from "./PAUSettingsPage";
import PAUDisplayPage from "./PAUDisplayPage";
import PAUDashboard from "./PAUDashboard";
import CoursePage from "./Coursepage";
import PAUMyCoursesPage from "./PAUMyCoursesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PAUHomePage />} />
      <Route path="/settings" element={<PAUSettingsPage />} />
      <Route path="/display" element={<PAUDisplayPage />} />
      <Route path="/dashboard" element={<PAUDashboard />} />
      <Route path="/course/:courseCode" element={<CoursePage />} />
      <Route path="/my-courses" element={<PAUMyCoursesPage />} />
    </Routes>
  );
}

export default App;