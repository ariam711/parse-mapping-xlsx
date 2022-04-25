import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import BaseConfigSelect from '../../commons/BaseConfigSelect';
import { StoreTypes, StoreTypesType } from './StoreTypes';

function StoreType() {
  const s = useContext(ContextImportStore);
  return (
    <BaseConfigSelect<StoreTypesType>
      id="store-type-id"
      value={s.storeType}
      label="Store Type"
      setAction={s.setStoreType}
      data={StoreTypes}
    />
  );
}

export default observer(StoreType);
