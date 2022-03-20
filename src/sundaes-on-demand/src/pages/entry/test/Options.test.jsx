import { render, screen } from "../../../test-utils/testing-library-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
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
