import { Outlet } from "react-router";

import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;