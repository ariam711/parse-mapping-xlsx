import React from 'react';
import { Box, Typography } from '@mui/material';

const containerStyles = {
  width: 'calc(100vw - 40px)',
  maxWidth: '700px',
  padding: '20px',
  borderRadius: '5px',
  margin: '100px auto',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
  alignItems: 'center',
  height: '353px',
  boxShadow: '0 0 3px 1px #00000073'
};
const messageStyles = {
  fontSize: '5rem'
};

const NoMatch = () => (
  <Box sx={containerStyles}>
    <Typography sx={messageStyles}>404 😖</Typography>
  </Box>
);

export default NoMatch;
