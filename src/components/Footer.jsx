import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        background: 'linear-gradient(135deg, rgba(22,26,31,0.98) 0%, rgba(15,18,21,0.98) 100%)',
        borderTop: '1px solid rgba(201, 164, 125, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 15% 50%, rgba(201, 164, 125, 0.08) 0%, rgba(0,0,0,0) 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'inline-block',
                mb: 2,
              }}
            >
              创意简历
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              专注于品牌策略和创意设计的广告行业专业人士，致力于为品牌创造独特的视觉语言和情感连接。
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="primary.light" gutterBottom sx={{ fontWeight: 600 }}>
              快速链接
            </Typography>
            <Box component="nav">
              <Link component={RouterLink} to="/" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                首页
              </Link>
              <Link component={RouterLink} to="/about" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                关于我
              </Link>
              <Link component={RouterLink} to="/portfolio" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                作品集
              </Link>
              <Link component={RouterLink} to="/skills" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                专业技能
              </Link>
              <Link component={RouterLink} to="/contact" color="text.secondary" sx={{ display: 'block' }}>
                联系方式
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="primary.light" gutterBottom sx={{ fontWeight: 600 }}>
              服务项目
            </Typography>
            <Box component="nav">
              <Link href="#" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                品牌策略
              </Link>
              <Link href="#" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                创意设计
              </Link>
              <Link href="#" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                广告策划
              </Link>
              <Link href="#" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                内容营销
              </Link>
              <Link href="#" color="text.secondary" sx={{ display: 'block' }}>
                社交媒体
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="primary.light" gutterBottom sx={{ fontWeight: 600 }}>
              联系方式
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              上海市浦东新区陆家嘴金融贸易区
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              contact@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              +86 138 8888 8888
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(201, 164, 125, 0.1)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} 创意简历. 保留所有权利.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              隐私政策
            </Link>
            <Typography color="text.secondary" sx={{ mx: 1 }}>|</Typography>
            <Link href="#" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              使用条款
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;