import React from 'react';
import { Container, Typography, Box, Grid, Paper, LinearProgress, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Skills = () => {
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
      {/* 技能页面头部 */}
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
            专业技能
          </Typography>
          <Typography variant="h6" align="center">
            十年广告行业经验沉淀的核心能力
          </Typography>
        </Container>
      </Box>

      {/* 技能内容 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          {/* 技术技能 */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{
                p: 4,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201, 164, 125, 0.08)',
                mb: { xs: 4, md: 0 },
                height: '100%'
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom sx={{ 
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                技术技能
              </Typography>
              
              {technicalSkills.map((skill, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="primary.light">
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={skill.level} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(201, 164, 125, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundImage: 'linear-gradient(90deg, #9E7B4F, #C9A47D)'
                      }
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
          
          {/* 创意技能 */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{
                p: 4,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201, 164, 125, 0.08)',
                height: '100%'
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom sx={{ 
                fontWeight: 600,
                mb: 4,
                background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                创意能力
              </Typography>
              
              <List>
                {creativeSkills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={skill} 
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    {index < creativeSkills.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ borderColor: 'rgba(201, 164, 125, 0.1)' }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* 工作流程 */}
        <Box sx={{ mt: 10, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
            fontWeight: 600,
            mb: 6,
            background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            我的工作流程
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { step: '01', title: '需求分析', desc: '深入了解品牌需求和目标受众，确定项目目标和关键指标' },
              { step: '02', title: '创意构思', desc: '基于分析结果，进行头脑风暴和创意构思，提出多种创意方向' },
              { step: '03', title: '方案设计', desc: '将创意转化为具体的设计方案和执行计划，包括视觉元素和传播策略' },
              { step: '04', title: '执行与优化', desc: '实施创意方案，并根据反馈进行持续优化，确保达到预期效果' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201, 164, 125, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(201, 164, 125, 0.15)'
                    }
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      position: 'absolute',
                      top: -20,
                      right: -10,
                      fontWeight: 800,
                      fontSize: '6rem',
                      opacity: 0.1,
                      color: 'primary.main'
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.light' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Skills;