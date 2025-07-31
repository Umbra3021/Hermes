import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserData } from "./context/UserContext";
import Loading from "./components/Loading";
import Register from "./pages/Register";

export default function App() {
  const { isAuth, loading } = UserData();
  return <>
    {loading ? <Loading /> : <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />

      </Routes>
    </BrowserRouter>}
  </>
}
