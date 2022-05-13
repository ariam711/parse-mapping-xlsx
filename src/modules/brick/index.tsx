import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, SxProps } from '@mui/material';
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

const brick = () => {
  const nodeTemplate = (node: any) => {
    return <Box>{node.label}</Box>;
  };

  return (
    <Box sx={backgroundStyles}>
      <Box sx={treeContainerStyles}>
        <Tree value={nodes} dragdropScope="tree" nodeTemplate={nodeTemplate} />
      </Box>
    </Box>
  );
};
export default brick;
