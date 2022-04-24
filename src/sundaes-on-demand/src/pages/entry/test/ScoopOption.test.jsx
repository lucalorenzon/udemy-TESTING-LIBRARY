import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../ScoopOption";

it("indicate if scoop count has invalid value", async () => {
  render(<ScoopOption name={""} imagePath={""} updateItemCounts={jest.fn()} />);
  const scoopInput = screen.getByRole("spinbutton");
  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "-1");
  screen.debug();
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "2.5");
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "11");
  expect(scoopInput).toHaveClass("is-invalid");

  userEvent.clear(scoopInput);
  userEvent.type(scoopInput, "3");
  expect(scoopInput).not.toHaveClass("is-invalid");
});
