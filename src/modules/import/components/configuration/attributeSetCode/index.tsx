import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextImportStore } from '../../../contexts/ContextImportStore';
import BaseConfigSelect from '../../commons/BaseConfigSelect';
import { AttributeSetType, AttributesSet } from './AttributeSet';

function AttributeSetCode() {
  const s = useContext(ContextImportStore);
  return (
    <BaseConfigSelect<AttributeSetType>
      id="attribute-set-id"
      value={s.attributeSet}
      label="Attribute Set"
      setAction={s.setAttributeSet}
      data={AttributesSet}
    />
  );
}

export default observer(AttributeSetCode);
