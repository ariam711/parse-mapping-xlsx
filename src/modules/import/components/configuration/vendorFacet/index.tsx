import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import { VendorFacetType, VendorsFacet } from './VendorsFacet';

function VendorFacet() {
  const s = useContext(ContextImportStore);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    s.setVendorFacet(event.target.value as VendorFacetType);
  }, []);
  const options = useMemo(
    () =>
      Object.entries(VendorsFacet).map(([key, value]) => (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      )),
    []
  );
  return (
    <FormControl fullWidth>
      <InputLabel id="vendor-facet-id">Vendor Facet</InputLabel>
      <Select
        size="small"
        labelId="vendor-facet-id"
        id="vendor-facet"
        value={s.vendorFacet}
        label="Vendor Facet"
        onChange={handleChange}>
        {options}
      </Select>
    </FormControl>
  );
}

export default observer(VendorFacet);
