import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const AlertBox = ({ variant = "danger", label = "Label" }) => {
  return <Alert variant={variant}>{label}</Alert>;
};

AlertBox.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
};

export default AlertBox;
