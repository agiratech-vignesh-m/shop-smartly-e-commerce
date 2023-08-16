import { AppBar, Avatar, Badge, Box, Button, IconButton, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '../../assets/logo-no-background.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logo1 from '../../assets/luffy_icon.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { clearLogin } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';

function Navbar() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const cartItems = useSelector((state) => state.cart?.items);
  console.log("Navbar - userData", loggedInUser);
  console.log("cartItems - userData", cartItems);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearLogin())
    dispatch(clearCart())
    navigate('/home')
  };
  return (
    <AppBar position='sticky' sx={{ bgcolor: '#001f3f' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <img
            src={logo}
            alt='logo'
            style={{ height: '80px', padding: '2rem 1rem 2rem' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => console.log('Todays deal Clicked')}
            sx={{
              my: 2,
              mr: '1.5rem',
              color: '#70CCCC',
              display: 'block',
              fontSize: '1rem',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Today's deal
          </Button>
          <Button onClick={() => console.log('Best sellers Clicked')} sx={{
            my: 2,
            mr: '1.5rem',
            color: '#70CCCC',
            display: 'block',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
            Best sellers
          </Button>
          <Button onClick={() => console.log('New Releases')} sx={{
            my: 2,
            mr: '1.5rem',
            color: '#70CCCC', 
            display: 'block',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
            New Releases
          </Button>
          <Button onClick={() => console.log('Gift ideas')} sx={{
            my: 2,
            mr: '1.5rem',
            color: '#70CCCC',
            display: 'block',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
            Gift ideas
          </Button>
          <Button onClick={() => console.log('Customer service')} sx={{
            my: 2,
            // mr: '1.5rem',
            color: '#70CCCC',
            display: 'block',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
            Customer service
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <IconButton color="inherit" sx={{ mr: '1rem' }}>
            <NotificationsIcon sx={{ color: '#E0443E' }} fontSize='large' />
          </IconButton> */}
          {loggedInUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                sx={{ mr: '1rem' }}
              >
                <Badge badgeContent={cartItems?.length} color="error">
                  <NotificationsIcon sx={{ color: '#CDD2D8' }} fontSize="large" />
                </Badge>
              </IconButton>
              {loggedInUser ? (
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Button
                    color="inherit"
                    onClick={handleMenuOpen}
                    aria-haspopup="true"
                    aria-label="user-menu"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      bgcolor: '#CDD2D8',
                      borderRadius: '1rem',
                      padding: '0.5rem 1rem 0.5rem',
                      '&:hover': {
                        backgroundColor: '#39cccc',
                      },
                    }}
                  >
                    <Avatar alt="Vignesh Manickam" src={logo1} sx={{ mr: 1.5 }}>
                    </Avatar>
                    <Typography variant="body2" sx={{ mr: 1, color: '#001f3f', fontWeight: 'bold' }}>
                      {loggedInUser.firstName}
                    </Typography>
                    {open ? <KeyboardArrowUpIcon sx={{ color: '#E0443E' }} /> : <KeyboardArrowDownIcon sx={{ color: '#E0443E' }} />}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleLogout} sx={{ padding: '0.5rem 2rem 0.5rem' }}>
                      <LogoutRoundedIcon fontSize="small" sx={{ mr: '0.5rem', color: '#001f3f' }} />
                      <ListItemText primary="Logout" sx={{ fontWeight: 'bold', mr: '0.5rem' }} />
                    </MenuItem>
                  </Menu>
                </Box>
              ) : null}
            </Box>

          ) : (
            <Button
              onClick={() => navigate('/login')}
              sx={{
                my: 2,
                mr: '1rem',
                color: '#70CCCC', 
                display: 'block',
                fontSize: '1.15rem',
                fontWeight: 'bold', 
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}>
              Login
            </Button>
          )}
        </Box>
        {/* </Stack> */}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar