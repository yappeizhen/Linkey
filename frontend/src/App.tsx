import { UserAuthProvider } from "./contexts/UserAuthContext";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </UserAuthProvider>
  );
};

export default App;
