import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import UserEdit from "./pages/admin/users/Edit";
import UserList from "./pages/admin/users/List";

import { Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forget-password" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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