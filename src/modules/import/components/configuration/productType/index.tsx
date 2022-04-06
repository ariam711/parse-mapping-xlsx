import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import { ProductTypes, ProductTypesType } from './ProductTypes';

function ProductType() {
  const s = useContext(ContextImportStore);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    s.setProductType(event.target.value as ProductTypesType);
  }, []);
  const options = useMemo(
    () =>
      Object.entries(ProductTypes).map(([key, value]) => (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      )),
    []
  );
  return (
    <FormControl fullWidth>
      <InputLabel id="product-type-id">Product Type</InputLabel>
      <Select
        size="small"
        labelId="product-type-id"
        id="product-type"
        value={s.productType}
        label="Product Type"
        onChange={handleChange}>
        {options}
      </Select>
    </FormControl>
  );
}

export default observer(ProductType);
