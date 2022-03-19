import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";

const checkboxLabel = (
  <span>
    I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
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
