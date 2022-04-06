import { Box, createTheme, ThemeProvider } from '@mui/material';
import React, { memo } from 'react';
import Import from './modules/import';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          p: '10px'
        }}>
        <Import />
      </Box>
    </ThemeProvider>
  );
}

export default memo(App);
