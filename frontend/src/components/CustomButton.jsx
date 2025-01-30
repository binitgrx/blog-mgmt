import { Button, Spinner } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

const CustomButton = memo(
  ({
    variant = "success",
    label = "Label",
    disable = false,
    loading = false,
  }) => {
    return (
      <Button variant={variant} disabled={disable} onClick={() => onclick()}>
        {loading && (
          <Spinner animation="border" variant="light" size="sm"></Spinner>
        )}
        &nbsp;{label}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
CustomButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  disable: PropTypes.bool,
};
export default CustomButton;
