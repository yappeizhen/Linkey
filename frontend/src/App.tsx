import { UserAuthProvider } from "./contexts/UserAuthContext";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import MainDashboardPage from "./pages/MainDashboardPage";
import ShortenedLinkPage from "./pages/ShortenedLinkPage";
const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<MainDashboardPage />} />
        <Route path="/short/:linkId" element={<ShortenedLinkPage />} />
      </Routes>
    </UserAuthProvider>
  );
};

export default App;
