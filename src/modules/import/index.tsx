import { Box, SxProps } from '@mui/material';
import React, { useContext } from 'react';
import Export from './components/Export';
import Sheet from './components/Sheet';
import Upload from './components/Upload';
import { ContextImportStore } from './contexts/ContextImportStore';

const sx: SxProps = {
  bgcolor: 'background.default',
  color: 'text.primary',
  '& > label': { width: '100%', height: '100%' },
  '&': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    height: '100vh',
    rowGap: '10px'
  }
};

function Import() {
  const { processImportedFile } = useContext(ContextImportStore);

  function onChange(event: any) {
    const file = event.currentTarget['files'][0];
    // console.log(`fileNAME: ${JSON.stringify(file.name)}`);
    !!file && processImportedFile(file);
    // setText(file.name);
    /*store.processImportedFile(file, () => {
      setTimeout(() => {
        store.updateStep(1);
        mainStore.setLoading(false);
      }, 500);
    });*/
  }

  return (
    <Box sx={sx}>
      <Box>
        <Upload onChange={onChange} />
        <Export />
      </Box>
      <Sheet />
    </Box>
  );
}

export default Import;
