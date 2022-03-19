import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from "./App";

test('button has correct initial color', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to MediumVioletRed');
});

test('initial conditions', () => {
  render(<App />);
  
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('when checkbox is checked the button is disabled', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})

test('Disable button has gray background and reverts to MediumVioletRed', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color:MediumVioletRed');

});

test('Clicked disabled button has gray background and reverts to MidnightBlue', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color:MidnightBlue');
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capitals letter", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});