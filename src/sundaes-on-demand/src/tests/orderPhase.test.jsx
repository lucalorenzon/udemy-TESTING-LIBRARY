import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phase form happy path", async () => {
  // render the app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesTopping);

  // find and click order button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsTotal = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsTotal).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accepts terms and conditions and click button to confirm order
  const termsAndConditions = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditions);
  const confirmOrderButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // Expect loading to show
  const loading = screen.getByText("Loading...");
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeading = await screen.findByRole("heading", {
    name: /Thank you/i,
  });
  expect(thankYouHeading).toBeInTheDocument();

  const notLoading = screen.queryByText("Loading...");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals has been reset
  const scoopsSubTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubTotal).toBeInTheDocument();
  const toppingsSubTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubTotal).toBeInTheDocument();

  // do we need to await something to avoid test errors?
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("Topping doesn't appear on summary if no topping ordered", async () => {
  // render the app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  // find and click order button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  const scoopsTotal = screen.getByRole("heading", {
    name: "Scoops: $2.00",
  });
  expect(scoopsTotal).toBeInTheDocument();
  const noToppingsTotal = screen.queryByRole("heading", {
    name: /Toppings/i,
  });
  expect(noToppingsTotal).not.toBeInTheDocument();
});
