import { memo } from "react";
import { Navigate } from "react-router";
import { isLoggedIn, isValidRole } from "../utils/routeGuard";
import PropTypes from "prop-types";

const PrivateRoute = memo(({ children, roles }) => {
  return (
    <>
      {isLoggedIn() && isValidRole(roles) ? (
        children
      ) : isLoggedIn() && !isValidRole(roles) ? (
        <Navigate replace to="/admin" />
      ) : (
        <Navigate replace to="/auth/login" />
      )}
    </>
  );
});

PrivateRoute.displayName = "PrivateRoute";
PrivateRoute.propTypes = {
  children: PropTypes.element,
  roles: PropTypes.array,
};

export default PrivateRoute;
