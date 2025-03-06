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
            创意简历
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button component={RouterLink} to="/" color="inherit" sx={{ mx: 1 }}>
              首页
            </Button>
            <Button component={RouterLink} to="/about" color="inherit" sx={{ mx: 1 }}>
              关于我
            </Button>
            <Button component={RouterLink} to="/portfolio" color="inherit" sx={{ mx: 1 }}>
              作品集
            </Button>
            <Button component={RouterLink} to="/skills" color="inherit" sx={{ mx: 1 }}>
              专业技能
            </Button>
            <Button component={RouterLink} to="/contact" color="inherit" sx={{ mx: 1 }}>
              联系方式
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/contact"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            联系我
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;