import React from "react";
import {
  RadioButton as RACRadioButton,
  RadioGroup as RACRadioGroup,
  type RadioGroupProps,
  RadioField as RACRadioField,
  type RadioFieldProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

// ********************************************* //
// CheckboxGroup and RadioGroup specific styles //
// ******************************************* //

export const customGroupStyles = tv({
  base: "cursor-pointer p-[1rem] border-1 rounded-md border-color-text text-center text-xl text-[#3b3b3b] mb-[.75rem] hover:bg-zinc-100 hover:border-1 hover:border-color-text flex items-center justify-center",
  variants: {
    isSelected: {
      true: "border-1 bg-[#4A4DED] text-white hover:bg-[#4A4DED] hover:text-white border-color-[#898989]",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      isFocusVisible: true,
    },
  ],
});

export function CustomRadioButtonGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className="flex flex-col gap-2">
      {props.children}
    </RACRadioGroup>
  );
}
interface CustomRadioButtonProps extends RadioFieldProps {
  label: string;
  value: string;
}

export function CustomRadio({
  label,
  value,
  ...props
}: CustomRadioButtonProps) {
  return (
    <RACRadioField
      {...props}
      value={value}
      className={({ isSelected, isDisabled }) =>
        customGroupStyles({
          isSelected: isSelected as any,
          isDisabled: isDisabled as any,
        })
      }
    >
      <RACRadioButton>{label}</RACRadioButton>
    </RACRadioField>
  );
}
