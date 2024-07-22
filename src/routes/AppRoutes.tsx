import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PublicProfile from "../pages/PublicProfile";
import PrivateRoute from "../utils/PrivateRoute";
import QrCode from "../pages/QrCode";
import NotFound from "../pages/NotFound";
import EditLinks from "../pages/EditLinks";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="public/:userIdUrl" element={<PublicProfile />} />
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
  )
}

export default AppRoutes;