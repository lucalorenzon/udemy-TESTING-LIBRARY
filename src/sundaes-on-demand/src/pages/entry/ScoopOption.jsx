import { useState } from "react";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ScoopOption = ({ name, imagePath, updateItemCounts }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = event.target.value;

    const currentValueNumber = parseFloat(currentValue);
    const isNewValueValid =
      currentValueNumber >= 0 &&
      currentValueNumber <= 10 &&
      currentValueNumber === Math.floor(currentValueNumber);
    setIsValid(isNewValueValid);

    if (isNewValueValid) {
      updateItemCounts(name, currentValueNumber);
    }
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            default={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
