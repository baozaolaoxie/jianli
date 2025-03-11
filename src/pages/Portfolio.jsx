import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Chip, Stack, Button, Fade, Tabs, Tab, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadProject from '../components/UploadProject';
import ProjectDetailDialog from '../components/ProjectDetailDialog';

const Portfolio = () => {
  // 作品集数据
  const projects = [
    {
      id: 1,
      title: '可口可乐品牌宣传片',
      category: '视频制作',
      description: '为可口可乐打造的夏季主题宣传片，通过鲜明的视觉语言和情感故事讲述品牌理念。',
      image: '/images/portfolio-1.jpg',
      tags: ['品牌宣传', '视频制作', '故事叙述']
    },
    {
      id: 2,
      title: '耐克运动系列平面广告',
      category: '平面设计',
      description: '为耐克新款运动系列设计的平面广告，强调产品性能与时尚设计的完美结合。',
      image: '/images/portfolio-2.jpg',
      tags: ['平面广告', '品牌设计', '创意概念']
    },
    {
      id: 3,
      title: '宝马社交媒体营销活动',
      category: '数字营销',
      description: '为宝马设计的社交媒体整合营销活动，提升品牌在年轻消费群体中的影响力。',
      image: '/images/portfolio-3.jpg',
      tags: ['社交媒体', '数字营销', '内容策略']
    },
    {
      id: 4,
      title: '星巴克季节限定产品包装',
      category: '包装设计',
      description: '为星巴克季节限定产品设计的包装，融合传统元素与现代设计语言。',
      image: '/images/portfolio-4.jpg',
      tags: ['包装设计', '视觉识别', '季节营销']
    },
    {
      id: 5,
      title: '苹果产品发布会视觉设计',
      category: '活动设计',
      description: '为苹果产品发布会设计的整体视觉形象，包括舞台、宣传材料和数字资产。',
      image: '/images/portfolio-5.jpg',
      tags: ['活动设计', '品牌体验', '视觉传达']
    },
    {
      id: 6,
      title: '优衣库品牌重塑项目',
      category: '品牌策略',
      description: '为优衣库进行的品牌重塑项目，包括视觉识别系统更新和传播策略制定。',
      image: '/images/portfolio-6.jpg',
      tags: ['品牌重塑', '策略规划', '视觉识别']
    }
  ];

  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState('全部');
  

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [allProjects, setAllProjects] = useState(projects);
  
  // 处理分类变化
  useEffect(() => {
    if (selectedCategory === '全部') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, allProjects]);

  // 处理分类点击
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  // 处理项目点击
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setOpenDetailDialog(true);
  };
  
  // 处理详情对话框关闭
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };
  
  // 处理上传对话框开关
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };
  
  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };
  
  // 处理作品上传成功
  const handleUploadSuccess = (newProject) => {
    // 添加新作品到列表
    const updatedProjects = [newProject, ...allProjects];
    setAllProjects(updatedProjects);
    
    // 确保在当前分类下也能看到新作品
    if (selectedCategory === '全部' || selectedCategory === newProject.category) {
      setFilteredProjects(prev => [newProject, ...prev]);
    }
    
    // 关闭上传对话框
    handleCloseUploadDialog();
    
    // 添加调试信息
    console.log('新作品已添加:', newProject);
    console.log('更新后的作品列表:', updatedProjects);
  };

  return (
    <>
      {/* 作品集头部 */}
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
            作品集
          </Typography>
          <Typography variant="h6" align="center">
            精选广告创意与品牌设计作品
          </Typography>
        </Container>
      </Box>

      {/* 分类筛选和上传按钮 */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>  
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenUploadDialog}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 4px 14px 0 rgba(201, 164, 125, 0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(201, 164, 125, 0.3)',
              }
            }}
          >
            上传作品
          </Button>
        </Box>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'rgba(201, 164, 125, 0.2)',
          mb: 4,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Tabs 
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            {['全部', ...new Set(allProjects.map(project => project.category))].map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category}
                sx={{ 
                  fontWeight: selectedCategory === category ? 600 : 400,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* 作品集展示 */}
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Fade in={true} timeout={500 + project.id * 100}>
                <Card 
                  elevation={0} 
                  onClick={() => handleProjectClick(project)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201, 164, 125, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(201, 164, 125, 0.15)',
                      '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)'
                      },
                      '& .overlay': {
                        opacity: 0.7
                      },
                      '& .view-project': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={project.image || (project.thumbnailCoverData || project.fullImage)}
                      alt={project.title}
                      sx={{
                        transition: 'transform 0.6s ease',
                      }}
                    />
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
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                    <Box
                      className="view-project"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, calc(-50% + 20px))',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        color: 'white',
                        textAlign: 'center',
                        width: '100%'
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
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="overline" color="primary.light" gutterBottom>
                      {project.category}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mt={2}>
                      {project.tags.map((tag, index) => (
                        <Chip 
                          key={index} 
                          label={tag} 
                          size="small" 
                          sx={{
                            bgcolor: 'rgba(201, 164, 125, 0.1)',
                            color: 'primary.light',
                            borderRadius: 1,
                          }} 
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              没有找到相关作品
            </Typography>
          </Box>
        )}
      </Container>
      
      {/* 上传作品对话框 */}
      <Dialog 
        open={openUploadDialog} 
        onClose={handleCloseUploadDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
          <UploadProject onUploadSuccess={handleUploadSuccess} />
        </DialogContent>
      </Dialog>
      
      {/* 作品详情对话框 */}
      <ProjectDetailDialog 
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        project={selectedProject}
      />
    </>
  );
};

export default Portfolio;