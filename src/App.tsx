import { AppBar, createTheme, SxProps, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React, { memo } from 'react';
import Import from './modules/import';
import Brick from './modules/brick';
import { Link, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import NoMatch from './modules/noMatch';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const menuItemStyles: SxProps = {
  border: '1px solid',
  borderRadius: '5px',
  borderColor: 'rgba(255,255,255,0.5)',
  '&:hover': {
    borderColor: 'rgba(255,255,255,0.9)',
    cursor: 'pointer'
  },
  padding: '5px',
  ml: 2,
  display: 'flex',
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none'
};

function App(): JSX.Element {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        { index: true, element: <Import /> },
        {
          path: '/catalog',
          element: <Import />
        },
        {
          path: '/brick',
          element: <Brick />
        },
        { path: '*', element: <NoMatch /> }
      ]
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Link to="/catalog">
            <Typography sx={menuItemStyles}>😼log</Typography>
          </Link>
          <Link to="/brick">
            <Typography sx={menuItemStyles}>🧱gen</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      {useRoutes(routes)}
    </ThemeProvider>
  );
}

export default memo(App);
