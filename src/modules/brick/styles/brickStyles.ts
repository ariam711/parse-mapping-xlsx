import { SxProps } from '@mui/material';

export const backgroundStyles: SxProps = {
  bgcolor: 'background.default',
  color: 'text.primary',
  minHeight: `${window.innerHeight - 65}px`,
  height: '100%'
};
export const treeContainerStyles: SxProps = {
  width: 'calc(100vw - 40px)',
  padding: '20px'
};
export const errorStyles: SxProps = {
  fontSize: '0.9rem',
  color: 'red'
};
export const toolbarStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  p: '20px 5px 5px'
};
export const nodeStyles: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '300px'
};
export const nodeLabelStyles: SxProps = {
  ':hover': {
    cursor: 'text',
    border: '1px solid',
    padding: '5px 16px 0 11px',
    borderRadius: '5px',
    borderColor: 'primary.main'
  },
  padding: '6px 16px 0 12px'
};
export const nodeLabelEditorStyles: SxProps = {
  input: {
    height: '42px',
    padding: '0px 13px'
  }
};
export const iconStyles: SxProps = {
  cursor: 'pointer',
  position: 'relative',
  padding: '0',
  ml: '5px',
  top: '8px',
  ':hover': {
    color: 'primary.main'
  }
};
