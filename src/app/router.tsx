import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login/page";
import RegisterPage from "./register/page";
import RegisterStep2 from "./register/createPassword";
import VerifyEmail from "./register/verifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/step2" element={<RegisterStep2 />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
