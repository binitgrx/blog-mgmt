import { useState } from "react";
import { Card } from "react-bootstrap";

import PropTypes from "prop-types";

const ImageWithFallback = ({ src, title }) => {
  const [img] = useState(src || "/images/card-img.png");
  return <Card.Img variant="top" src={img} alt={title} height={200} />;
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default ImageWithFallback;
