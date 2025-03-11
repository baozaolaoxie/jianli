import React from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Card, CardContent, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* 英雄区域 - 增强视觉冲击力 */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: 12,
          pb: 12,
          backgroundImage: 'linear-gradient(135deg, rgba(58,123,213,0.8) 0%, rgba(0,210,255,0.8) 100%), url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          textAlign: 'center',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(248,249,250,1) 0%, rgba(248,249,250,0) 100%)',
            zIndex: 2,
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              mb: 3,
              background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SHOW YOURSELF
          </Typography>
          <Typography 
            variant="h5" 
            color="inherit" 
            paragraph
            sx={{
              fontWeight: 400,
              letterSpacing: '0.05em',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              maxWidth: '700px',
              mx: 'auto',
              mb: 5,
            }}
          >
            展示您的才华作品 · 打造个性简历
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/portfolio"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              查看作品集
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderWidth: 2,
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  borderWidth: 2,
                  background: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              联系我
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 简介部分 - 更现代的卡片设计 */}
      <Container sx={{ py: 12, position: 'relative' }} maxWidth="lg">
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: '10%',
            width: '35%',
            height: '35%',
            background: 'radial-gradient(circle, rgba(213,51,105,0.08) 0%, rgba(213,51,105,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: -1,
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '25%',
            height: '25%',
            background: 'radial-gradient(circle, rgba(58,123,213,0.08) 0%, rgba(58,123,213,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: -1,
          }}
        />
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3a7bd5 0%, #d53369 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #3a7bd5, #d53369)',
              borderRadius: 2,
            }
          }}
        >
          为什么选择我们
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: 'all 0.4s ease',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #3a7bd5, #00d2ff)',
                },
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                简历制作
              </Typography>
              <Divider sx={{ width: '30%', mb: 3, borderColor: 'rgba(58,123,213,0.3)' }} />
              <Typography sx={{ color: '#546e7a', lineHeight: 1.7 }}>
                专为自由职业者打造的简历模板，突出您的项目经验和专业技能，帮助您吸引更多优质客户和项目机会。
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: 'all 0.4s ease',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
                },
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                作品展示
              </Typography>
              <Divider sx={{ width: '30%', mb: 3, borderColor: 'rgba(0,210,255,0.3)' }} />
              <Typography sx={{ color: '#546e7a', lineHeight: 1.7 }}>
                上传并展示您的最佳作品，支持多种媒体格式，让潜在合作伙伴直观了解您的创意实力和专业水平。
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 作品预览 */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 6,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3a7bd5 0%, #d53369 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                background: 'linear-gradient(90deg, #3a7bd5, #d53369)',
                borderRadius: 2,
              }
            }}
          >
            功能特色
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    height: 280,
                    backgroundImage: `url("/images/portfolio-${item}.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                      '& .overlay': {
                        opacity: 1,
                      },
                      '& .content': {
                        transform: 'translateY(0)',
                      }
                    },
                  }}
                >
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)',
                      opacity: 0.6,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                  <Box
                    className="content"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      color: 'white',
                      transform: 'translateY(20px)',
                      transition: 'transform 0.4s ease',
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {item === 1 && '个性化简历'}
                      {item === 2 && '作品集管理'}
                      {item === 3 && '专业技能展示'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {item === 1 && '打造专属于您的个性简历'}
                      {item === 2 && '轻松管理和展示您的创意作品'}
                      {item === 3 && '突出您的专业技能和软件掌握程度'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/portfolio"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              查看更多作品
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 联系部分 - 更现代的设计 */}
      <Container sx={{ py: 12, position: 'relative' }} maxWidth="md">
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(58,123,213,0.08) 0%, rgba(58,123,213,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '-15%',
            width: '35%',
            height: '35%',
            background: 'radial-gradient(circle, rgba(213,51,105,0.08) 0%, rgba(213,51,105,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            zIndex: -1,
          }}
        />
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 3,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3a7bd5 0%, #d53369 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          准备好创建您的专业简历了吗？
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            color: 'text.secondary',
            mb: 6,
            maxWidth: '700px',
            mx: 'auto',
          }}
        >
          只需简单几步，您就能创建一份专业的个性化简历，展示您的才华和技能。
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/show-you"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            开始创建
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;