import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';

const backgroundStyles: SxProps = {
  bgcolor: 'background.default',
  color: 'text.primary',
  height: `${window.innerHeight - 65}px`,
  display: 'flex',
  alignItems: 'center'
};

const containerStyles: SxProps = {
  width: 'calc(100vw - 40px)',
  maxWidth: '700px',
  padding: '20px',
  borderRadius: '5px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
  alignItems: 'center',
  height: '353px',
  boxShadow: '0 0 3px 1px #66666673'
};
const messageStyles: SxProps = {
  fontSize: '5rem'
};

const NoMatch = () => (
  <Box sx={backgroundStyles}>
    <Box sx={containerStyles}>
      <Typography sx={messageStyles}>404 😖</Typography>
    </Box>
  </Box>
);

export default NoMatch;
