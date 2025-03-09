import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
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
            <Button component={RouterLink} to="/show-you" color="inherit" sx={{ mx: 1 }}>
              SHOW YOU
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/show-you"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            登录
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;