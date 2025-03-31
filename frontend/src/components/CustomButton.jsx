import { memo } from "react";
import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomButton = memo(
  ({
    variant = "success",
    label = "Label",
    disabled = false,
    loading = false,
    onClick,
  }) => {
    return (
      <Button variant={variant} disabled={disabled} onClick={() => onClick()}>
        {loading && <Spinner animation="border" variant="light" size="sm" />}
        &nbsp;<span className="text-white">{label}</span>
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
CustomButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CustomButton;
export { CustomButton };
// export default memo(CustomButton);