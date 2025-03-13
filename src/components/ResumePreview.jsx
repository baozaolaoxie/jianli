// 导入React核心库和钩子函数
import React, { useState, useEffect } from 'react';
// 导入Material UI组件
import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Chip, Tabs, Tab } from '@mui/material';
// 导入Material UI图标
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // 勾选图标
import EmailIcon from '@mui/icons-material/Email'; // 邮件图标
import PhoneIcon from '@mui/icons-material/Phone'; // 电话图标
import LocationOnIcon from '@mui/icons-material/LocationOn'; // 位置图标
import ChatIcon from '@mui/icons-material/Chat'; // 聊天图标
import TwitterIcon from '@mui/icons-material/Twitter'; // 推特图标
// 导入项目详情对话框组件
import ProjectDetailDialog from './ProjectDetailDialog';

// 简历预览组件，接收简历数据作为属性
const ResumePreview = ({ resumeData }) => {
  // 从简历数据中解构出各部分信息
  const { about, portfolio, skills, contact } = resumeData;
  
  // 作品详情预览状态
  const [selectedProject, setSelectedProject] = useState(null); // 当前选中的项目
  const [openDetailDialog, setOpenDetailDialog] = useState(false); // 详情对话框显示状态
  
  // 分类相关状态
  const [currentCategory, setCurrentCategory] = useState('全部'); // 当前选中的分类
  const [filteredPortfolio, setFilteredPortfolio] = useState([]); // 筛选后的作品集
  const [categories, setCategories] = useState(['全部']); // 所有分类列表
  
  // 处理作品点击预览
  const handleProjectClick = (project) => {
    // 设置当前选中的项目
    setSelectedProject(project);
    // 打开详情对话框
    setOpenDetailDialog(true);
  };
  
  // 处理详情对话框关闭
  const handleCloseDetailDialog = () => {
    // 关闭详情对话框
    setOpenDetailDialog(false);
  };
  
  // 处理分类切换
  const handleCategoryChange = (event, newCategory) => {
    setCurrentCategory(newCategory);
  };
  
  // 初始化分类列表和筛选作品
  useEffect(() => {
    if (portfolio && portfolio.length > 0) {
      // 提取所有作品的分类，并去重
      const uniqueCategories = ['全部', ...new Set(portfolio.map(project => project.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      // 根据当前选中的分类筛选作品
      filterPortfolioByCategory(currentCategory);
    } else {
      setFilteredPortfolio([]);
    }
  }, [portfolio, currentCategory]);
  
  // 根据分类筛选作品
  const filterPortfolioByCategory = (category) => {
    if (category === '全部') {
      setFilteredPortfolio(portfolio);
    } else {
      setFilteredPortfolio(portfolio.filter(project => project.category === category));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 个人信息部分 */}
      <Paper 
        elevation={0} 
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/images/profile.jpg"
              alt={about.name}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              {about.name}
            </Typography>
            <Typography variant="h5" color="primary.main" gutterBottom>
              {about.title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography paragraph>
              {about.bio}
            </Typography>
            <Typography paragraph>
              {about.experience}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 作品集部分 */}
      <Paper 
        elevation={0} 
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          作品集
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {/* 分类标签栏 */}
        <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab 
                key={index} 
                label={category} 
                value={category}
                sx={{ 
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 2,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Tabs>
        </Box>
        
        <Grid container spacing={3} sx={{ 
          minHeight: '200px',
          '& .MuiGrid-item': {
            transition: 'all 0.5s ease-in-out',
          }
        }}>
          {filteredPortfolio.map((project, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                onClick={() => handleProjectClick(project)}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                  border: '1px solid rgba(201, 164, 125, 0.08)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(201, 164, 125, 0.15)'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${project.thumbnailCoverData || project.image || project.fullImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Box 
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 0.7
                      }
                    }}
                  />
                  <Box
                    className="view-project"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      color: 'white',
                      textAlign: 'center',
                      width: '100%',
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                  >
                    <Typography variant="button" sx={{ 
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      pb: 0.5
                    }}>
                      查看详情
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tags && project.tags.map((tag, idx) => (
                      <Chip 
                        key={idx} 
                        label={tag} 
                        size="small" 
                        sx={{
                          bgcolor: 'rgba(201, 164, 125, 0.1)',
                          color: 'primary.light',
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* 技能部分 */}
      <Paper 
        elevation={0} 
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          专业技能
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(201, 164, 125, 0.2)',
                  background: 'rgba(22,26,31,0.5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(201, 164, 125, 0.15)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {skill.level}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* 联系方式部分 */}
      <Paper 
        elevation={0} 
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          联系方式
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Typography>{contact.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Typography>{contact.phone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Typography>常驻地: {contact.location}</Typography>
            </Box>
          </Grid>
          
          {/* 社交媒体部分 */}
          {contact.social && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                  社交媒体
                </Typography>
              </Grid>
              {contact.social.weixin && (
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChatIcon sx={{ color: 'primary.main', mr: 2 }} />
                    <Typography>微信: {contact.social.weixin}</Typography>
                  </Box>
                </Grid>
              )}
              {contact.social.weibo && (
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TwitterIcon sx={{ color: 'primary.main', mr: 2 }} />
                    <Typography>微博: {contact.social.weibo}</Typography>
                  </Box>
                </Grid>
              )}
              {contact.social.xiaohongshu && (
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ChatIcon sx={{ color: 'primary.main', mr: 2 }} />
                    <Typography>小红书: {contact.social.xiaohongshu}</Typography>
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Paper>
      
      {/* 作品详情对话框 */}
      <ProjectDetailDialog 
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        project={selectedProject}
      />
    </Container>
  );
};

export default ResumePreview;