import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import BaseConfigSelect from '../../commons/BaseConfigSelect';
import { VendorFacetType, VendorsFacet } from './VendorsFacet';

function VendorFacet() {
  const s = useContext(ContextImportStore);
  return (
    <BaseConfigSelect<VendorFacetType>
      id="vendor-facet-id"
      value={s.vendorFacet}
      label="Vendor Facet"
      setAction={s.setVendorFacet}
      data={VendorsFacet}
    />
  );
}

export default observer(VendorFacet);
