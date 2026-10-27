import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomRadio, CustomRadioButtonGroup } from "./CustomRadioButtonGroup";

const meta = {
  title: "Howarts/CustomRadioButtonGroup",
  component: CustomRadioButtonGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: (
      <>
        <CustomRadio key="option1" label="Option 1" value="option1" />
        <CustomRadio key="option2" label="Option 2" value="option2" />
        <CustomRadio key="option3" label="Option 3" value="option3" />
      </>
    ),
  },
};
