import React, { useContext } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, SxProps } from '@mui/material';
import { data as nodes } from './data';

const backgroundStyles: SxProps = {
  bgcolor: 'background.default',
  color: 'text.primary',
  minHeight: `${window.innerHeight - 65}px`,
  height: '100%'
};

const treeContainerStyles: SxProps = {
  width: 'calc(100vw - 40px)',
  padding: '20px'
};

const Brick = (): JSX.Element => {
  const { onGetCategories } = useContext(ContextBrickStore);

  const nodeTemplate = (node: any) => {
    return <Box>{node.label}</Box>;
  };

  return (
    <Box sx={backgroundStyles}>
      <Box>
        <Button variant="outlined" onClick={onGetCategories}>
          Get Categories
        </Button>
      </Box>
      <Box sx={treeContainerStyles}>
        <Tree value={nodes} dragdropScope="tree" nodeTemplate={nodeTemplate} />
      </Box>
    </Box>
  );
};

export default Brick;
