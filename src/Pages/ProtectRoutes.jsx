import { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
}

export default ProtectRoutes;

ProtectRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
