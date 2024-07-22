import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import QrCode from "./pages/QrCode";
import EditLinks from "./pages/EditLinks";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      {/* Aqui pode vir um header fixo */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path=":userIdUrl" element={<Home />} />
        <Route
          path="user/:userIdUrl"
          element={
            <PrivateRoute>
              <QrCode />
            </PrivateRoute>
          }
        />
        <Route
          path="user/:userIdUrl/edit"
          element={
            <PrivateRoute>
              <EditLinks />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
