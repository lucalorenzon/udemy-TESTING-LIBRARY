import { render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  userEvent.click(checkbox);
  const button = await findByRole(`button`, { name: /confirm order/i });
  expect(button).toBeEnabled();
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

it(`should respond to hover with popover`, async () => {
  const { queryByText, getByText } = render(<SummaryForm />);
  // popover starts out hidden
  const nullpopover = queryByText(/no ice cream will actually be delivered/i);
  expect(nullpopover).not.toBeInTheDocument();
  // popover appears upon mouseover of checkbox label
  const termsAndConditions = await getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover will disappear when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    queryByText(/no ice cream will actually be delivered/i)
  );
});
