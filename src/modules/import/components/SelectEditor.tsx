import { Autocomplete, ListItem, TextField } from '@mui/material';
import React, { forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useState } from 'react';
import { OptionType } from '../types/OptionType';

export type FldUploadImageProps = {
  onChange?(event: { target: HTMLInputElement }): void;
  id?: string;
  disabled?: boolean;
};

type SelectForwardProps = PropsWithChildren<Record<string, never>> & { value: string; options: OptionType[] };

const SelectEditor = forwardRef(function SelectEditor(props: SelectForwardProps, ref) {
  const [newValue, setNewValue] = useState<any>(null);
  useImperativeHandle(
    ref,
    () => ({
      getValue() {
        return newValue?.map || '';
      }
    }),
    [newValue]
  );

  const updateValue = useCallback((map = '') => {
    setNewValue({ map });
  }, []);

  return (
    <Autocomplete
      id="mapping-column-editor-id"
      freeSolo
      fullWidth
      openOnFocus
      disableCloseOnSelect={false}
      options={props.options}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          autoFocus
          onChange={({ target }) => updateValue(target.value)}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} style={{ color: '#b1b1b1' }}>
          {option}
        </ListItem>
      )}
      getOptionLabel={(option: any) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.map;
      }}
      onChange={(event, changedValue: any) => {
        if (typeof changedValue === 'string') {
          updateValue(changedValue);
        } else if (changedValue?.inputValue) {
          updateValue(changedValue.inputValue);
        } else {
          setNewValue(changedValue);
        }
      }}
    />
  );
});

export default SelectEditor;
