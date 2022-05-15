import React, { useContext } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, Checkbox, SxProps, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

// region STYLES

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

const nodeStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '300px'
};

const nodeLabelStyles: SxProps = {
  padding: '9px 0'
};

const checkboxStyles: SxProps = {
  ml: ''
};

// endregion

const Brick = (): JSX.Element => {
  const { onGetCategories, gettingCategories, failedToGetCategories, categoryTree, onToggleCategory } =
    useContext(ContextBrickStore);

  const nodeTemplate = (node: any) => {
    return (
      <Box sx={nodeStyles}>
        <Box sx={nodeLabelStyles}>{node.label}</Box>
        <Checkbox
          sx={checkboxStyles}
          checked={node.enabled}
          onChange={() => {
            onToggleCategory(node.key);
          }}
        />
      </Box>
    );
  };

  return (
    <Box sx={backgroundStyles}>
      <Box sx={toolbarStyles}>
        <Box>
          <Button variant="outlined" onClick={onGetCategories}>
            Get Categories {gettingCategories && '...'}
          </Button>
          {failedToGetCategories && <Typography sx={errorStyles}>failed to get categories</Typography>}
        </Box>
      </Box>
      <Box sx={treeContainerStyles}>
        <Tree value={categoryTree} dragdropScope="tree" nodeTemplate={nodeTemplate} />
      </Box>
    </Box>
  );
};

export default observer(Brick);
