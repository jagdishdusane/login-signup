import LoginForm from "./components/page/LoginForm";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./components/page/SignUpForm";
import HomePage from "./components/page/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
