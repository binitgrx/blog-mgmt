import { Outlet } from "react-router";

import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        {/* Main Layout */}
        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <div className="col-2 d-flex flex-column">
            <AdminNavbar />
          </div>
          {/* Main Content */}
          <div className="col-10 d-flex flex-column">
            <div className="flex-grow-1 m-5 p-4 overflow-hidden">
              <Outlet />
            </div>
            <div className="text-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
