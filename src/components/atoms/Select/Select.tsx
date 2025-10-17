import { Select as BaseUiSelect } from "@base-ui-components/react";
import { CheckIcon } from "@chems/Icons/CheckIcon";
import { ChevronUpDownIcon } from "@chems/Icons/ChevronUpDownIcon";
import {
  item,
  itemIndicator,
  itemIndicatorIcon,
  itemText,
  list,
  popup,
  positioner,
  scrollArrow,
  select,
  selectIcon,
} from "./Select.css";
import type { ReactNode } from "react";

interface SelectProps<Value, Multiple extends boolean | undefined>
  extends BaseUiSelect.Root.Props<Value, Multiple> {
  placeholder: string;
}

export function Select<Value, Multiple extends boolean | undefined>({
  children,
  placeholder,
  value,
  ...rest
}: SelectProps<Value, Multiple>) {
  return (
    <BaseUiSelect.Root {...rest}>
      <BaseUiSelect.Trigger className={select}>
        {value ? <BaseUiSelect.Value /> : placeholder}
        <BaseUiSelect.Icon className={selectIcon}>
          <ChevronUpDownIcon />
        </BaseUiSelect.Icon>
      </BaseUiSelect.Trigger>
      <BaseUiSelect.Portal>
        <BaseUiSelect.Positioner className={positioner} sideOffset={8}>
          <BaseUiSelect.Popup className={popup}>
            <BaseUiSelect.ScrollUpArrow className={scrollArrow} />
            <BaseUiSelect.List className={list}>{children}</BaseUiSelect.List>
            <BaseUiSelect.ScrollDownArrow className={scrollArrow} />
          </BaseUiSelect.Popup>
        </BaseUiSelect.Positioner>
      </BaseUiSelect.Portal>
    </BaseUiSelect.Root>
  );
}

interface SelectItemProps<T> {
  label?: string;
  value: T;
}

export function SelectItem<Value>({ label, value }: SelectItemProps<Value>) {
  return (
    <BaseUiSelect.Item className={item} value={value}>
      <BaseUiSelect.ItemIndicator className={itemIndicator}>
        <CheckIcon className={itemIndicatorIcon} />
      </BaseUiSelect.ItemIndicator>
      <BaseUiSelect.ItemText className={itemText}>
        {label ?? (value as ReactNode)}
      </BaseUiSelect.ItemText>
    </BaseUiSelect.Item>
  );
}
