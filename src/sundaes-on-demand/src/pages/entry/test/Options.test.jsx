import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

it("display images for each scoops from the server", async () => {
  render(<Options optionType={"scoops"} />);

  // find the images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm altText of images
  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
it("display images for each toppings from the server", async () => {
  render(<Options optionType={"toppings"} />);

  // find the images
  const scoopImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(scoopImages).toHaveLength(3);

  // confirm altText of images
  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

it("should not update the totals if some scoop is invalid", async () => {
  render(<Options optionType={"scoops"} />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  const scoopsSubTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubTotal).toBeInTheDocument();
});
