import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

it("should handle errors for toppings and scoops routes", async () => {
  server.resetHandlers(
    rest.get(`http://localhost:3030/scoops`, (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(`http://localhost:3030/toppings`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

it("should disable order button if no scoops ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundae!",
  });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderButton).not.toBeDisabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
