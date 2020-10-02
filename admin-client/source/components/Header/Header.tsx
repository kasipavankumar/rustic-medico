import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const options = [
  {
    name: 'Login',
    link: '/login/superuser',
  },
  {
    name: 'Disclaimer',
    link: '/disclaimer',
  },
];

const ITEM_HEIGHT = 48;

export default function Header({ path }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);

  const open = Boolean(anchorEl);
  const subPath = path ? ` / ${path}` : '';

  useEffect(() => {
    const token = cookie.get('_SID_');

    setMenuOptions([
      {
        name: 'Disclaimer',
        link: '/disclaimer',
      },
      {
        name: token ? 'Logout' : 'Login',
        link: token ? '/logout' : '/login',
      },
    ]);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography className={`${classes.title}`} variant="h6" color="inherit">
            <Link href="/">
              <a className={classes.link}>Rustic Medico</a>
            </Link>
            {subPath}
          </Typography>

          <IconButton edge="start" onClick={handleClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Menu
            keepMounted
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 5.5,
                width: '20ch',
              },
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem component="a" href={option.link} key={option.name} onClose={handleClose}>
                {option.name}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
