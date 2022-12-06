import * as React from 'react';
import { Link as ToPage, useLocation } from "react-router-dom"
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, Breadcrumbs, Link, Toolbar, CssBaseline, Divider, IconButton,Drawer as MuiDrawer } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import WalletIcon from '@mui/icons-material/Wallet';

import Content from "./content"
import Menus from './menus';
const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainLayout() {
  const theme = useTheme();
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={false}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,

            }}
          >
            {/* <MenuIcon /> */}
            <WalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.8 }} fontSize="medium" />
              Home
            </Link>
            {location.pathname != "/" ?
              <Link
                underline="none"
                sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}
                color="inherit"
              >
                {
                  location.pathname.replace("/", "")}
              </Link> : null
            }
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" >
        <DrawerHeader/>
        <Divider />
        <Menus />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Content />
      </Box>
    </Box>
  );
}