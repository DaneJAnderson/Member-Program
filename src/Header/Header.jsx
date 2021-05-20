import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';

import { Link, NavLink, useHistory } from 'react-router-dom';


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
}));

export default function Header() {
  const classes = useStyles();
  let history = useHistory();

  // const logout =()=>{   

  //   history.replace('/');
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title +" font-weight-bold"}>
          <NavLink to="/" style={{ textDecoration: 'none', color:'white'  }}>
          {/* <Icon style={{ fontSize: 30 }}>home</Icon> */}
          <Home style={{ fontSize: 40 }} className="ml-3 mr-3 mt-n2" />
             COK Member Referral </NavLink>
          </Typography>
          <Link to='/report' style={{ textDecoration: 'none' }}>
            <Button color="inherit"  className="mr-md-5 mr-2 bg-info text-white border pl-4 pr-4 pl-md-2 pr-md-2">Reports</Button>
            </Link>
          <Link to='/login' style={{ textDecoration: 'none', color:'white' }}>
            <Button color="inherit" className="mr-md-3 mr-0"><i>Log out</i></Button>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}