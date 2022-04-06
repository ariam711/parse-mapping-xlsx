import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ContextImportStore } from '../contexts/ContextImportStore';

function Export() {
  const { onExport } = useContext(ContextImportStore);
  return (
    <Button variant="outlined" component="span" onClick={onExport} color="secondary">
      Export
    </Button>
  );
}

export default Export;
