import { Col, Card, Placeholder, Table } from "react-bootstrap";
import ImageWithFallback from "./ImageWithFallback";
import PropTypes from "prop-types";

const SkeletalLoading = () => {
  return (
    <Col md={6} lg={3} className="mb-4">
      <Card>
        <ImageWithFallback />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} />
            <Placeholder xs={4} /> <Placeholder xs={6} />
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder xs={7} /> <Placeholder xs={2} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export const TableLoading = ({ tableHeaders = [] }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            {tableHeaders.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr>
              <td>
                <Placeholder xs={8} />
              </td>
              {tableHeaders.map((_, idx) => (
                <td key={idx}>
                  <Placeholder xs={8} />
                </td>
              ))}
              <td>
                <Placeholder xs={8} />
              </td>
            </tr>
          }
        </tbody>
      </Table>
    </>
  );
};

TableLoading.propTypes = {
  tableHeaders: PropTypes.array,
};

export default SkeletalLoading;
