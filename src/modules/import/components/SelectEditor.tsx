import { Autocomplete, TextField } from '@mui/material';
import React, { forwardRef, PropsWithChildren, useImperativeHandle, useState } from 'react';
import { OptionType } from '../types/OptionType';

export type FldUploadImageProps = {
  onChange?(event: { target: HTMLInputElement }): void;
  id?: string;
  disabled?: boolean;
};

type SelectForwardProps = PropsWithChildren<Record<string, never>> & { value: string; options: OptionType[] };

const SelectEditor = forwardRef(function SelectEditor({ value, options, ...props }: SelectForwardProps, ref) {
  // const s = useContext(ContextImportStore);

  // console.log(`PROPS: `, props);
  // console.log(`options: ${JSON.stringify(options, null, 2)}`);
  // console.log(`PROPS: `, s.optionsToMap);
  const [newValue, setNewValue] = useState<any>(null);
  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return newValue;
      }
    };
  });
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={options}
      renderInput={params => {
        console.log(`PARAMS: `, params);
        return <TextField {...params} />;
      }}
      renderOption={(props, option) => {
        console.log(`Option: ${JSON.stringify(option)}`);
        return (
          <li {...props} style={{ color: 'white' }}>
            {option.map}
          </li>
        );
      }}
      getOptionLabel={(option: any) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.map;
      }}
      onChange={(event, changedValue: any) => {
        if (typeof changedValue === 'string') {
          setNewValue({
            title: changedValue
          });
        } else if (changedValue?.inputValue) {
          // Create a new value from the user input
          setNewValue({
            title: changedValue.inputValue
          });
        } else {
          setNewValue(changedValue);
        }
      }}
    />
  );
});

export default SelectEditor;
