import { Box, SxProps } from '@mui/material';
import React, { memo } from 'react';
import AttributeSetCode from './attributeSetCode';
import ProductType from './productType';
import StoreType from './storeType';
import VendorFacet from './vendorFacet';

const sx: SxProps = { '&': { display: 'grid', gridTemplateColumns: 'repeat(4,200px)', columnGap: '10px' } };

function Configuration() {
  return (
    <Box sx={sx}>
      <StoreType />
      <ProductType />
      <AttributeSetCode />
      <VendorFacet />
    </Box>
  );
}

export default memo(Configuration);
