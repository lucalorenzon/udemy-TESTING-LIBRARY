import { render, screen } from "@testing-library/react";
import Options from "../Options";
it("display images for each scoopes from the server", async () => {
  render(<Options optionType={"scoops"} />);

  // find the images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm altText of images
  const altTexts = scoopImages.map((element) => element.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
