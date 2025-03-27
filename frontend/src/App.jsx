import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import UserEdit from "./pages/admin/users/Edit";
import UserList from "./pages/admin/users/List";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Route, Routes } from "react-router";
import VerifyForgetPassword from "./pages/auth/VerifyForgetPassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="email-verify" element={<EmailVerification />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-forget-password" element={<VerifyForgetPassword/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserEdit />} />
          <Route path="*" element={<ErrorPage link="/admin" />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;