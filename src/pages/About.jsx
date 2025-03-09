import React from 'react';
import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Button, LinearProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';

const About = () => {
  // 技能数据
  const technicalSkills = [
    { name: 'Adobe Photoshop', level: 95 },
    { name: 'Adobe Illustrator', level: 90 },
    { name: 'Adobe Premiere Pro', level: 85 },
    { name: 'Adobe After Effects', level: 80 },
    { name: 'Figma', level: 85 },
    { name: 'Sketch', level: 75 }
  ];

  const creativeSkills = [
    '品牌策略规划',
    '创意概念开发',
    '视觉设计',
    '内容营销策略',
    '用户体验设计',
    '广告文案创作',
    '社交媒体营销',
    '品牌故事叙述'
  ];
  
  return (
    <>
      {/* 个人简介头部 */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
            关于我
          </Typography>
          <Typography variant="h6" align="center">
            创意导演 · 品牌策划师 · 视觉艺术家
          </Typography>
        </Container>
      </Box>

      {/* 个人介绍 */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/images/profile.jpg"
              alt="暴躁老谢"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                mb: { xs: 4, md: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              张明
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              资深创意导演 / 广告策划
            </Typography>
            <Typography paragraph>
              我是一位拥有10年广告行业经验的创意导演，专注于品牌故事讲述和视觉创意。我的职业生涯始于国际4A广告公司，曾服务过众多知名品牌，包括可口可乐、耐克、宝马等。
            </Typography>
            <Typography paragraph>
              我擅长将品牌理念转化为引人入胜的视觉故事，通过创新的广告策划和精准的市场洞察，帮助品牌在竞争激烈的市场中脱颖而出。我的作品曾获得戛纳国际创意节、One Show等国际广告奖项的认可。
            </Typography>
            <Typography>
              我相信，真正有力量的广告不仅仅是美丽的画面，更是能够触动人心、引发共鸣的故事。这也是我一直以来的创作理念。
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* 专业经历 */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            专业经历
          </Typography>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              创意总监 | 星辰广告 (2018-至今)
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              负责公司核心客户的创意策略和执行
            </Typography>
            <Typography paragraph>
              • 领导15人创意团队，负责从创意概念到执行的全流程管理
            </Typography>
            <Typography paragraph>
              • 为超过20个国内外知名品牌提供创意服务，包括品牌策略、广告创意和内容营销
            </Typography>
            <Typography>
              • 带领团队获得多个行业奖项，提升公司在行业内的声誉和影响力
            </Typography>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              资深创意 | 奥美广告 (2014-2018)
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              负责国际客户的创意策划与执行
            </Typography>
            <Typography paragraph>
              • 参与多个国际品牌的广告策划，包括电视广告、平面广告和数字营销
            </Typography>
            <Typography paragraph>
              • 主导开发了获得戛纳银狮奖的品牌宣传活动
            </Typography>
            <Typography>
              • 协助培训初级创意人员，提升团队整体创意水平
            </Typography>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              创意设计师 | 灵智广告 (2011-2014)
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              负责品牌视觉设计和创意概念开发
            </Typography>
            <Typography paragraph>
              • 参与品牌视觉识别系统设计和广告创意开发
            </Typography>
            <Typography paragraph>
              • 负责多个平面广告和数字广告项目的设计工作
            </Typography>
            <Typography>
              • 协助创意总监完成客户提案和创意方案呈现
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* 作品集 */}
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
            精选作品
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
                      {item === 1 && '品牌宣传片'}
                      {item === 2 && '平面广告设计'}
                      {item === 3 && '社交媒体营销'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {item === 1 && '通过视觉语言讲述品牌故事'}
                      {item === 2 && '创新的平面设计解决方案'}
                      {item === 3 && '全方位的社交媒体策略'}
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
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(58,123,213,0.25)'
                }
              }}
            >
              查看更多作品
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 联系方式 */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
          联系方式
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>contact@example.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>+86 123 4567 8910</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>北京市朝阳区创意产业园</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" size="large" sx={{ borderRadius: 2 }}>
            联系我
          </Button>
        </Box>
      </Container>

      {/* 个人技能 */}
      <Box sx={{ 
        py: 8, 
        position: 'relative',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        overflow: 'hidden',
      }}>
        <Box 
          sx={{
            position: 'absolute',
            bottom: '-5%',
            right: '-10%',
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(213,51,105,0.05) 0%, rgba(213,51,105,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
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
          }}>
            个人技能
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ 
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                height: '100%'
              }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  设计技能
                </Typography>
                <Divider sx={{ width: '30%', mb: 3, borderColor: 'rgba(58,123,213,0.3)' }} />
                
                {technicalSkills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#546e7a' }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#3a7bd5' }}>
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(58,123,213,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          backgroundImage: 'linear-gradient(90deg, #3a7bd5, #00d2ff)'
                        }
                      }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ 
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                height: '100%'
              }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  创意能力
                </Typography>
                <Divider sx={{ width: '30%', mb: 3, borderColor: 'rgba(213,51,105,0.3)' }} />
                
                <List>
                  {creativeSkills.map((skill, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ py: 1.5 }}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon sx={{ color: '#d53369' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={skill} 
                          primaryTypographyProps={{ fontWeight: 500, color: '#546e7a' }}
                        />
                      </ListItem>
                      {index < creativeSkills.length - 1 && (
                        <Divider variant="inset" component="li" sx={{ borderColor: 'rgba(213,51,105,0.1)' }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default About;