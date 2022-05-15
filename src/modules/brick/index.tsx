import React, { useContext } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, Checkbox, SxProps, TextField, Typography } from '@mui/material';
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
  ':hover': {
    cursor: 'text',
    border: '1px solid',
    padding: '5px 16px 0 11px',
    borderRadius: '5px',
    borderColor: 'primary.main'
  },
  padding: '6px 16px 0 12px'
};

const checkboxStyles: SxProps = {
  ml: ''
};

const nodeLabelEditorStyles: SxProps = {
  input: {
    height: '42px',
    padding: '0px 13px'
  }
};

// endregion

const Brick = (): JSX.Element => {
  const {
    onGetCategories,
    gettingCategories,
    failedToGetCategories,
    categoryTree,
    onToggleCategory,
    onSetCategoryLabel,
    setEditingLabel,
    setEditingId,
    editingLabel,
    editingId
  } = useContext(ContextBrickStore);

  const nodeTemplate = (node: any) => {
    return (
      <Box sx={nodeStyles}>
        {editingLabel && editingId === node.key ? (
          <TextField
            sx={nodeLabelEditorStyles}
            autoFocus
            onChange={event => {
              setEditingLabel(event.target.value);
            }}
            onBlur={() => {
              onSetCategoryLabel(editingId as string, editingLabel);
            }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onSetCategoryLabel(editingId as string, editingLabel);
              }
            }}
            value={editingLabel}
          />
        ) : (
          <Box
            sx={nodeLabelStyles}
            onDoubleClick={() => {
              setEditingLabel(node.label);
              setEditingId(node.key);
            }}>
            {node.label}
          </Box>
        )}
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
