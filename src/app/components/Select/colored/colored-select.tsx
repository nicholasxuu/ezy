import { styled } from '@nextui-org/react';
import React from 'react';

import { SelectFactory, SelectProps } from '../select';
import { StyledSelect } from '../select.styled';
import { ColoredOption } from './colored-option';
import { ColoredSingleValue } from './colored-single-value';
import { ColoredSelectOption } from './interfaces';

export type ColoredSelectProps = SelectProps<ColoredSelectOption> & {
  onRemove: (item: ColoredSelectOption) => void;
};

const TypedColoredSelect = React.memo(SelectFactory<ColoredSelectOption>());
const StyledColoredSelect = React.memo(styled(TypedColoredSelect, StyledSelect));

export const ColoredSelect: React.FC<ColoredSelectProps> = ({
  bordered = false,
  separator = false,
  size = 'md',
  css,
  ...props
}) => (
  <StyledColoredSelect
    bordered={bordered}
    separator={separator}
    size={size}
    css={css}
    {...props}
    className="react-select"
    classNamePrefix="react-select"
    isSearchable={false}
    components={{
      SingleValue: ColoredSingleValue,
      // @ts-ignore
      Option: ColoredOption,
    }}
  />
);
