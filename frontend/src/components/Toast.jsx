import { useState } from "react";
import { Col, Row, Toast, ToastContainer } from "react-bootstrap";
import PropTypes from "prop-types";

const ToastBox = ({ msg, variant = "danger" }) => {
  const [show, setShow] = useState(true);
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer
          className="p-3 mb-5"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            bg={variant}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">BlogQuill</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

ToastBox.propTypes = {
  msg: PropTypes.string,
  variant: PropTypes.string,
};

export default ToastBox;
