/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  cloneElement,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Decorator } from "@storybook/react";

import { DateTimePickerType } from "../../../types/DateTimePicker";

const Wrapper: FC<PropsWithChildren<DateTimePickerType>> = ({ children, value, onChange, ...props }) => {
  const [localValue, setLocalValue] = useState(value);

  const onLocalChange = useCallback(
    (v: any) => {
      setLocalValue(v);
      onChange?.(v);
    },
    [onChange]
  );

  const wrappedWithOnChange = useMemo(
    () =>
      cloneElement(children as ReactElement<any>, {
        ...props,
        value: localValue,
        onChange: onLocalChange,
      }),
    [children, localValue, onLocalChange, props]
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return wrappedWithOnChange;
};

const DateTimePickerDecorator: Decorator<DateTimePickerType> = (Story, { args }) => (
  <Wrapper {...args}>{Story()}</Wrapper>
);

export default DateTimePickerDecorator;
