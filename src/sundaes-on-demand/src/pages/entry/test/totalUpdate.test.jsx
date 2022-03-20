import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

it("should update scoops subtotal when scoop changes", async () => {
  render(<Options optionType={"scoops"} />);

  // make sure total start from $0.00
  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubTotal).toHaveTextContent("0.00");

  // update the vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");

  // update the chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubTotal).toHaveTextContent("6.00");
});

it("should update toppings subtotal when toppings changes", async () => {
  render(<Options optionType={"toppings"} />);

  // make sure total start from $0.00
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  // select a Cherries topping and check the subtotal
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesTopping).not.toBeChecked();
  userEvent.click(cherriesTopping);
  expect(toppingsSubTotal).toHaveTextContent("1.50");

  // select a M&Ms topping and check the subtotal
  const mmsTopping = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  expect(mmsTopping).not.toBeChecked();
  userEvent.click(mmsTopping);
  expect(toppingsSubTotal).toHaveTextContent("3.00");

  // uncheck cherries topping and check the subtotal
  userEvent.click(cherriesTopping);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grandtotal", () => {
  it("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
    const mms = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mms);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand total: \$/i,
    });
    const mms = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mms);
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });
  it("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByRole("heading", {
      name: /Grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
    const mms = await screen.findByRole("checkbox", { name: "M&Ms" });
    userEvent.click(mms);
    expect(grandTotal).toHaveTextContent("5.50");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("1.50");
    userEvent.click(mms);
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
