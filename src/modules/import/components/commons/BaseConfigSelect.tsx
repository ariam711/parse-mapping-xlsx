import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo } from 'react';

type BaseConfigSelectProps<T> = {
  id: string;
  label: string;
  value: string;
  data: Record<string, string>;
  setAction(value: T): void;
};

function BaseConfigSelect<T = any>({ id, label, value, data, setAction }: BaseConfigSelectProps<T>) {
  const onChange = useCallback((event: SelectChangeEvent) => {
    setAction(event.target.value as unknown as T);
  }, []);
  const options = useMemo(
    () =>
      Object.entries(data).map(([key, optionLabel]) => (
        <MenuItem key={key} value={optionLabel}>
          {key}
        </MenuItem>
      )),
    []
  );
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select size="small" labelId={id} id={`cmp-${id}`} value={value} label={label} onChange={onChange}>
        {options}
      </Select>
    </FormControl>
  );
}

export default observer(BaseConfigSelect);
