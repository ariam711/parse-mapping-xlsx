import React, { useContext, useEffect } from 'react';
import { ContextBrickStore } from './contexts/ContextBrickStore';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Tree } from 'primereact/tree';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TreeNodeType } from './types/TreeNodeType';
import { AddBoxOutlined, Delete } from '@mui/icons-material';
import '../../assets/css/menu.css';
import brick from './templates/brick';
import { flexshopper } from './legacy/flexshopper';
import {
  backgroundStyles,
  errorStyles,
  iconStyles,
  nodeLabelEditorStyles,
  nodeLabelStyles,
  nodeStyles,
  toolbarStyles,
  treeContainerStyles
} from './styles/brickStyles';

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

  // component did mount
  useEffect(() => {
    flexshopper();
  }, []);

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
      <div className="header-menu-outer" dangerouslySetInnerHTML={{ __html: brick }} />
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
