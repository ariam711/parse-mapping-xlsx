import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import { AttributeSetType, AttributesSet } from './AttributeSet';

function AttributeSetCode() {
  const s = useContext(ContextImportStore);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    s.setAttributeSet(event.target.value as AttributeSetType);
  }, []);
  const options = useMemo(
    () =>
      Object.entries(AttributesSet).map(([key, value]) => (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      )),
    []
  );
  return (
    <FormControl fullWidth>
      <InputLabel id="attribute-set-id">Attribute Set</InputLabel>
      <Select
        size="small"
        labelId="attribute-set-id"
        id="attribute-set"
        value={s.attributeSet}
        label="Attribute Set"
        onChange={handleChange}>
        {options}
      </Select>
    </FormControl>
  );
}

export default observer(AttributeSetCode);
