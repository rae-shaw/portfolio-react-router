import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import {
  CustomRadio,
  CustomRadioButtonGroup,
} from "./CustomRadioButtonGroup";

afterEach(cleanup);

const getRadio = (name: string) =>
  screen.getByRole<HTMLInputElement>("radio", { name });

describe("CustomRadioButtonGroup component", () => {
  it("renders its radio options with an accessible group label", () => {
    render(
      <CustomRadioButtonGroup aria-label="Choose a house">
        <CustomRadio label="Gryffindor" value="gryffindor" />
        <CustomRadio label="Ravenclaw" value="ravenclaw" />
      </CustomRadioButtonGroup>
    );

    expect(
      screen.getByRole("radiogroup", { name: "Choose a house" })
    ).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Gryffindor" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Ravenclaw" })).toBeTruthy();
  });

  it("marks the default value as selected", () => {
    render(
      <CustomRadioButtonGroup
        aria-label="Choose a house"
        defaultValue="ravenclaw"
      >
        <CustomRadio label="Gryffindor" value="gryffindor" />
        <CustomRadio label="Ravenclaw" value="ravenclaw" />
      </CustomRadioButtonGroup>
    );

    expect(getRadio("Ravenclaw").checked).toBe(true);
    expect(getRadio("Gryffindor").checked).toBe(false);
  });

  it("calls onChange and selects an option when it is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <CustomRadioButtonGroup
        aria-label="Choose a house"
        onChange={handleChange}
      >
        <CustomRadio label="Gryffindor" value="gryffindor" />
        <CustomRadio label="Ravenclaw" value="ravenclaw" />
      </CustomRadioButtonGroup>
    );

    await user.click(screen.getByRole("radio", { name: "Gryffindor" }));

    expect(getRadio("Gryffindor").checked).toBe(true);
    expect(handleChange).toHaveBeenCalledWith("gryffindor");
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();

    render(
      <CustomRadioButtonGroup
        aria-label="Choose a house"
        defaultValue="gryffindor"
      >
        <CustomRadio label="Gryffindor" value="gryffindor" />
        <CustomRadio label="Ravenclaw" value="ravenclaw" isDisabled />
      </CustomRadioButtonGroup>
    );

    const disabledOption = getRadio("Ravenclaw");
    expect(disabledOption.disabled).toBe(true);

    await user.click(disabledOption);

    expect(getRadio("Gryffindor").checked).toBe(true);
    expect(disabledOption.checked).toBe(false);
  });
});

describe("CustomRadioButtonGroup accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <CustomRadioButtonGroup aria-label="Choose a house">
        <CustomRadio label="Gryffindor" value="gryffindor" />
        <CustomRadio label="Ravenclaw" value="ravenclaw" />
      </CustomRadioButtonGroup>
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});