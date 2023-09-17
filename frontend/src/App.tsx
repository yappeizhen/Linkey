import { UserAuthProvider } from "./contexts/UserAuthContext";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import MainDashboardPage from "./pages/MainDashboardPage";
const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<MainDashboardPage />} />
        <Route path="/short/:linkId" element={<MainDashboardPage />} />
      </Routes>
    </UserAuthProvider>
  );
};

export default App;
