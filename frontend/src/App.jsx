import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import UserEdit from "./pages/admin/users/Edit";
import UserList from "./pages/admin/users/List";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Route, Routes } from "react-router";
import VerifyForgetPassword from "./pages/auth/VerifyForgetPassword";
import PrivateRoute from "./components/PrivateRoute";
import BlogList from "./pages/admin/blogs/List";
import BlogEdit from "./pages/admin/blogs/Edit";
import MyBlogs from "./pages/admin/blogs/MyBlogs";
import AddBlog from "./pages/admin/blogs/Add";
import Bookmarks from "./pages/blogs/Bookmarks";
import Blogs from "./pages/blogs/Blogs";
import Blog from "./pages/blogs/Blog";
import GetProfile from "./pages/admin/users/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="email-verify" element={<EmailVerification />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-forget-password" element={<VerifyForgetPassword/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="my-blogs"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <MyBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="add-blog"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <AddBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogList />
              </PrivateRoute>
            }
          />
          <Route
            path="blogs/:slug"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <BlogEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute roles={["admin", "user"]}>
                <GetProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <PrivateRoute roles={["admin"]}>
                <UserEdit />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage link="/admin" />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<Blog />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;