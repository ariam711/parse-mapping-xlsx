import React, { useContext } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, Checkbox, SxProps, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TreeNodeType } from './types/TreeNodeType';
import { AddBoxOutlined, Delete } from '@mui/icons-material';

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

const nodeLabelEditorStyles: SxProps = {
  input: {
    height: '42px',
    padding: '0px 13px'
  }
};

const iconStyles: SxProps = {
  cursor: 'pointer',
  position: 'relative',
  padding: '0',
  ml: '5px',
  top: '8px',
  ':hover': {
    color: 'primary.main'
  }
};

// endregion

const Brick = (): JSX.Element => {
  const {
    gettingCategories,
    failedToGetCategories,
    categoryTree,
    editingLabel,
    editingId,
    onGetCategories,
    onToggleCategory,
    onSetCategoryLabel,
    onDeleteCategory,
    onAddCategory,
    setCategories,
    setEditingLabel,
    setEditingId
  } = useContext(ContextBrickStore);

  const labelEditorTemplate = (
    <TextField
      sx={nodeLabelEditorStyles}
      autoFocus
      onChange={event => {
        setEditingLabel(event.target.value);
      }}
      onBlur={() => {
        if (!editingId || !editingLabel) return;
        onSetCategoryLabel(editingId, editingLabel);
      }}
      onKeyPress={event => {
        if (!editingId || !editingLabel) return;
        if (event.key === 'Enter') {
          onSetCategoryLabel(editingId, editingLabel);
        }
      }}
      value={editingLabel}
    />
  );

  const labelTemplate = (node: any) => (
    <Box
      sx={{ ...nodeLabelStyles, top: 0 }}
      onDoubleClick={() => {
        setEditingLabel(node.label);
        setEditingId(node.key);
      }}>
      {node.label}
    </Box>
  );

  const nodeTemplate = (node: any) => {
    return (
      <Box sx={nodeStyles}>
        {editingLabel && editingId === node.key ? labelEditorTemplate : labelTemplate(node)}
        <Box>
          <Checkbox
            sx={{ ...iconStyles, top: 0 }}
            checked={node.enabled}
            onChange={() => {
              onToggleCategory(node.key);
            }}
          />
          <Delete
            sx={iconStyles}
            onClick={() => {
              onDeleteCategory(node.key);
            }}
          />
          <AddBoxOutlined
            sx={iconStyles}
            onClick={() => {
              onAddCategory(node.key);
            }}
          />
        </Box>
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
        <Tree
          value={categoryTree}
          dragdropScope="tree"
          onDragDrop={event => {
            setCategories(event.value as TreeNodeType[]);
          }}
          nodeTemplate={nodeTemplate}
        />
      </Box>
    </Box>
  );
};

export default observer(Brick);
