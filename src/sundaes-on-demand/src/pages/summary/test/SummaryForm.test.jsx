import { fireEvent, render } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import { SummaryForm } from "../SummaryForm";

it(`should have checkbox uncheked as initial and button disabled`, async () => {
  const { findByRole } = render(<SummaryForm />);
  const checkbox = await findByRole(`checkbox`, {
    name: /terms and condition/i,
  });
  expect(checkbox).not.toBeChecked;

  const button = await findByRole(`button`, { name: /confirm order/i });
  expect(button).toBeDisabled();
});

it(`should enable the button on first click and disable the button on second click`, async () => {
  const { findByRole } = render(<SummaryForm />);
  const checkbox = await findByRole(`checkbox`, {
    name: /terms and condition/i,
  });
  fireEvent.click(checkbox);
  const button = await findByRole(`button`, { name: /confirm order/i });
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
