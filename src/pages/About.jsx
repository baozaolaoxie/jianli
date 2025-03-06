import React from 'react';
import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
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

      {/* 教育背景 */}
      <Container maxWidth="md" sx={{ py: 8, position: 'relative' }}>
        <Box 
          sx={{
            position: 'absolute',
            top: '10%',
            left: '-5%',
            width: '25%',
            height: '25%',
            background: 'radial-gradient(circle, rgba(58,123,213,0.06) 0%, rgba(58,123,213,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: -1,
          }}
        />
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
          教育背景
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                中央美术学院
              </Typography>
              <Typography color="text.secondary" gutterBottom sx={{ mb: 2, fontStyle: 'italic' }}>
                视觉传达设计 | 硕士学位 (2009-2011)
              </Typography>
              <Typography sx={{ color: '#546e7a', lineHeight: 1.7 }}>
                专注于品牌设计和广告创意研究，毕业设计获得院系优秀作品奖
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                浙江大学
              </Typography>
              <Typography color="text.secondary" gutterBottom sx={{ mb: 2, fontStyle: 'italic' }}>
                艺术设计 | 学士学位 (2005-2009)
              </Typography>
              <Typography sx={{ color: '#546e7a', lineHeight: 1.7 }}>
                主修广告设计，辅修市场营销，多次获得校级设计比赛奖项
              </Typography>
            </Paper>
          </Grid>
        </Grid>
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
            专业技能
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
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  创意能力
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="品牌策略规划" 
                      secondary="深入理解品牌核心价值，制定有效的品牌传播策略" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#3a7bd5' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ borderColor: 'rgba(58,123,213,0.1)' }} />
                  <ListItem>
                    <ListItemText 
                      primary="创意概念开发" 
                      secondary="能够快速产生原创创意概念，并将其转化为可执行的广告方案" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#3a7bd5' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ borderColor: 'rgba(58,123,213,0.1)' }} />
                  <ListItem>
                    <ListItemText 
                      primary="故事叙述" 
                      secondary="擅长通过引人入胜的故事传达品牌信息，创造情感共鸣" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#3a7bd5' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
                </List>
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
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                  技术技能
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Adobe创意套件" 
                      secondary="精通Photoshop、Illustrator、Premiere Pro等设计软件" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#d53369' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ borderColor: 'rgba(213,51,105,0.1)' }} />
                  <ListItem>
                    <ListItemText 
                      primary="摄影与视频制作" 
                      secondary="具备专业的摄影技巧和视频拍摄、剪辑能力" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#d53369' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
                  <Divider component="li" sx={{ borderColor: 'rgba(213,51,105,0.1)' }} />
                  <ListItem>
                    <ListItemText 
                      primary="数字营销工具" 
                      secondary="熟悉各种数字营销平台和工具，能够策划并执行整合营销传播方案" 
                      primaryTypographyProps={{ fontWeight: 500, color: '#d53369' }}
                      secondaryTypographyProps={{ color: '#546e7a' }}
                    />
                  </ListItem>
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