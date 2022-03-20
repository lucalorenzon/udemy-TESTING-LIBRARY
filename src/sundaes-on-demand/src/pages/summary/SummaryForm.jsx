import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>No ice cream will actually be delivered</Popover.Body>
  </Popover>
);

const checkboxLabel = (
  <span>
    I agree to{" "}
    <OverlayTrigger placement="right" overlay={popover}>
      <span style={{ color: "blue" }}>Terms and Conditions</span>
    </OverlayTrigger>
  </span>
);

export const SummaryForm = () => {
  const [approved, setApproved] = useState(false);
  return (
    <div>
      <Form>
        <FormGroup controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
            label={checkboxLabel}
          />
          <Button variant="primary" type="submit" disabled={!approved}>
            Confirm order
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
