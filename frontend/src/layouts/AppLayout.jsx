import { Outlet } from "react-router";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div>
      <AppNavbar />
      <main
        className="container"
        style={{ minHeight: "80vh", marginTop: "85px" }}
      >
        <div className="container mt-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
