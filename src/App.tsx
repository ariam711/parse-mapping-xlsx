import { createTheme, ThemeProvider } from '@mui/material';
import React, { memo } from 'react';
import Import from './modules/import';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <Import />
    </ThemeProvider>
  );
}

export default memo(App);
