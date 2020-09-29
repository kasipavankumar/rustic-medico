import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuOpen } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import styles from './Header.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    const open = Boolean(anchorEl);
    const subPath = path ? ` / ${path}` : '';

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
                    <Typography className={`${classes.title} ${styles.title}`} variant="h6" color="inherit">
                        <Link href="/">Rustic Medico</Link>
                        {subPath}
                    </Typography>

                    <IconButton edge="start" className={classes.menuButton} onClick={handleClick} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 5.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <Link key={option.name} href={option.link}>
                                <MenuItem onClick={handleClose}>{option.name}</MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
