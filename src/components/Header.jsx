import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ isLoggedIn, userData, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            SHOW YOURSELF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button component={RouterLink} to="/" color="inherit" sx={{ mx: 1 }}>
              首页
            </Button>
            <Button component={RouterLink} to={isLoggedIn ? "/profile" : "/login"} color="inherit" sx={{ mx: 1 }}>
              Show You
            </Button>
          </Box>

          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                欢迎，{userData?.username || '用户'}
              </Typography>
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls="user-menu"
                aria-haspopup="true"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                  个人主页
                </MenuItem>
                <MenuItem onClick={handleLogout}>退出登录</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/login"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              登录
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;