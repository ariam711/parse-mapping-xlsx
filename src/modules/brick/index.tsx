import React, { useContext } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, SxProps, Typography } from '@mui/material';
import { data as nodes } from './data';
import { observer } from 'mobx-react-lite';

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

const errorStyles: SxProps = {
  fontSize: '0.9rem',
  color: 'red'
};

const toolbarStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  p: '20px 5px 5px'
};

const Brick = (): JSX.Element => {
  const { onGetCategories, gettingCategories, failedToGetCategories } = useContext(ContextBrickStore);

  const nodeTemplate = (node: any) => {
    return <Box>{node.label}</Box>;
  };

  return (
    <Box sx={backgroundStyles}>
      <Box sx={toolbarStyles}>
        <Button variant="outlined" onClick={onGetCategories}>
          Get Categories {gettingCategories && '...'}
        </Button>
        {failedToGetCategories && <Typography sx={errorStyles}>failed to get categories</Typography>}
      </Box>
      <Box sx={treeContainerStyles}>
        <Tree value={nodes} dragdropScope="tree" nodeTemplate={nodeTemplate} />
      </Box>
    </Box>
  );
};

export default observer(Brick);
