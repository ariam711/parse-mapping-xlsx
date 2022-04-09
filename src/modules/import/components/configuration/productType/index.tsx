import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import BaseConfigSelect from '../../commons/BaseConfigSelect';
import { ProductTypes, ProductTypesType } from './ProductTypes';

function ProductType() {
  const s = useContext(ContextImportStore);
  return (
    <BaseConfigSelect<ProductTypesType>
      id="product-type-id"
      value={s.productType}
      label="Product Type"
      setAction={s.setProductType}
      data={ProductTypes}
    />
  );
}

export default observer(ProductType);
