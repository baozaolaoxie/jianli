import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Divider,
  Alert,
  Dialog,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import Login from '../components/Login';
import UploadProject from '../components/UploadProject';
import ResumePreview from '../components/ResumePreview';
import ProjectDetailDialog from '../components/ProjectDetailDialog';
import ShareResumeDialog from '../components/ShareResumeDialog';

const ShowYou = () => {
  // 当前选中的编辑标签
  const [currentTab, setCurrentTab] = useState(0);
  
  // 生成的简历ID
  const [resumeId, setResumeId] = useState('');
  
  // 分享对话框状态
  const [openShareDialog, setOpenShareDialog] = useState(false);
  
  // 用户简历数据
  const [resumeData, setResumeData] = useState({
    about: {
      name: '',
      title: '',
      bio: '',
      experience: '',
    },
    portfolio: [],
    skills: [],
    categories: [], // 添加自定义分类数组
    contact: {
      email: '',
      phone: '',
      location: '',
      social: {
        weixin: '',
        weibo: '',
        xiaohongshu: '', // 添加小红书字段
      },
    },
  });
  
  // 新技能输入
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  
  // 新分类输入
  const [newCategory, setNewCategory] = useState('');
  
  // 保存状态提示
  const [saveStatus, setSaveStatus] = useState({
    show: false,
    type: 'success',
    message: '',
  });
  
  // 处理登录成功
  const handleLoginSuccess = (userData) => {
    // setIsLoggedIn(true);
    // setUser(userData);
    // 实际应用中，这里应该从后端获取用户的简历数据
    // 这里使用模拟数据
    setResumeData({
      about: {
        name: 'WHO ARE YOU?',
        title: '您的职位',
        bio: '在这里简要介绍您的专业背景和擅长领域。',
        experience: '在这里列出您的主要工作经历和项目经验。',
      },
      portfolio: [
        {
          id: 1,
          title: '可口可乐品牌故事',
          category: '视频制作',
          description: '为可口可乐打造的夏季主题宣传片，通过鲜明的视觉语言和情感故事讲述品牌理念。',
          image: '/images/portfolio-1.jpg',
          tags: ['品牌宣传', '视频制作', '故事叙述']
        },
      ],
      skills: [
        { name: 'Adobe Photoshop', level: '精通' },
        { name: 'Adobe Premiere', level: '精通' },
        { name: 'Adobe After Effects', level: '熟练' },
        { name: '品牌策略', level: '精通' },
      ],
      categories: ['视频制作', '平面设计', '数字营销', '品牌策略'], // 添加默认分类
      contact: {
        email: 'contact@example.com',
        phone: '+86 1XX XXXX XXXX',
        location: '上海市浦东新区陆家嘴金融贸易区',
        social: {
          weixin: 'wxid_example',
          weibo: '@',
          xiaohongshu: '@', // 添加小红书默认值
        },
      },
    });
  };
  
  // 处理标签切换
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // 处理表单输入变化
  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  
  // 处理嵌套表单输入变化
  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section][nestedSection],
          [field]: value,
        },
      },
    }));
  };
  
  // 添加新技能
  const handleAddSkill = () => {
    if (newSkill && newSkillLevel) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill, level: newSkillLevel }],
      }));
      setNewSkill('');
      setNewSkillLevel('');
    }
  };
  
  // 删除技能
  const handleDeleteSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };
  
  // 删除作品
  const handleDeleteProject = (projectId) => {
    // 检查projectId是否存在
    if (projectId === undefined || projectId === null) {
      console.error('删除作品失败：无效的项目ID');
      return;
    }
    
    // 检查是否能找到对应的项目
    const projectExists = resumeData.portfolio.some(project => 
      (typeof projectId === 'number' && project.id === projectId) || 
      (typeof projectId === 'string' && project.id.toString() === projectId.toString())
    );
    
    if (!projectExists) {
      console.error(`删除作品失败：找不到ID为${projectId}的项目`);
      return;
    }
    
    // 执行删除操作
    setResumeData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(project => {
        // 处理不同类型的ID比较
        if (typeof project.id === 'number' && typeof projectId === 'number') {
          return project.id !== projectId;
        }
        // 转换为字符串进行比较，确保类型不匹配时也能正确比较
        return project.id.toString() !== projectId.toString();
      }),
    }));
    
    // 显示成功提示
    setSaveStatus({
      show: true,
      type: 'success',
      message: '作品已删除！',
    });
    
    // 3秒后隐藏提示
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  
  // 处理作品上传成功
  const handleUploadSuccess = (newProject) => {
    // 优化作品数据，减少存储大小
    const optimizedProject = {
      ...newProject,
      // 确保必要的字段都有默认值
      id: newProject.id || Date.now(),
      title: newProject.title || '未命名作品',
      category: newProject.category || '未分类',
      description: newProject.description || '',
      tags: Array.isArray(newProject.tags) ? [...newProject.tags] : [],
      fileType: newProject.fileType || 'image',
      hasFullContent: true,
      // 处理文件数据
      file: newProject.thumbnailFile || null, // 使用缩略图作为主要显示
      fullContentFile: newProject.file || null, // 原始文件作为完整内容
      image: newProject.thumbnailCoverData || newProject.image || newProject.fullImage || null, // 优先使用缩略图封面
      thumbnailCoverData: newProject.thumbnailCoverData || newProject.image || null, // 确保缩略图数据存在
      fullContentImage: newProject.fullImage || newProject.coverData || null // 保存完整图片数据
    };

    setResumeData(prev => ({
      ...prev,
      portfolio: [optimizedProject, ...prev.portfolio],
    }));
    
    // 显示成功提示
    setSaveStatus({
      show: true,
      type: 'success',
      message: '作品上传成功！',
    });
    
    // 3秒后隐藏提示
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  
  // 预览状态
  const [showPreview, setShowPreview] = useState(false);
  
  // 作品详情预览状态
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  
  // 处理作品点击预览
  const handleProjectClick = (project) => {
    if (!project) {
      console.error('项目数据为空，无法预览');
      return;
    }
    try {
      // 确保project是一个有效的对象，并提供默认值防止属性访问错误
      const safeProject = {
        id: project.id || Date.now(),
        title: project.title || '未命名作品',
        category: project.category || '未分类',
        description: project.description || '',
        image: project.image || null,
        thumbnailFile: project.thumbnailFile || null,
        file: project.file || null,
        fileType: project.fileType || 'image',
        tags: Array.isArray(project.tags) ? [...project.tags] : [],
        hasFullContent: project.hasFullContent || false,
        fullContentFile: project.fullContentFile || null,
        fullContentImage: project.fullContentImage || null
      };
      // 设置选中的项目
      setSelectedProject(safeProject);
      // 打开详情对话框
      setOpenDetailDialog(true);
    } catch (error) {
      console.error('打开项目详情时出错:', error);
      // 即使出错也尝试打开对话框，但使用最小化的安全对象
      setSelectedProject({
        title: '作品详情',
        description: '无法加载完整作品信息',
        fileType: 'image'
      });
      setOpenDetailDialog(true);
    }
  };
  
  // 处理详情对话框关闭
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    // 延迟清除选中的项目，避免UI闪烁
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };
  
  // 错误处理函数 - 用于捕获和处理渲染错误
  const handleRenderError = (error, info) => {
    console.error('渲染错误:', error, info);
    setSaveStatus({
      show: true,
      type: 'error',
      message: '页面渲染出错，请刷新页面或联系支持团队'
    });
  };

  // 处理分享对话框关闭
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };
  
  // 生成唯一的简历ID
  const generateResumeId = () => {
    // 实际应用中，这个ID应该由后端生成并与用户关联
    // 这里使用时间戳和随机数的组合作为简单的模拟
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
  };
  
  // 保存简历数据
  const handleSaveResume = () => {
    // 保存前显示加载状态
    setSaveStatus({
      show: true,
      type: 'info',
      message: '正在保存简历...',
    });
    
    // 模拟API请求延迟
    setTimeout(() => {
      try {
        // 验证必要的数据字段
        if (!resumeData.about.name || !resumeData.about.title) {
          throw new Error('姓名和职位是必填项');
        }

        // 生成简历ID
        const newResumeId = generateResumeId();
        setResumeId(newResumeId);
        
        // 优化portfolio数据，减少存储大小，实现渐进式加载
        const optimizedPortfolio = resumeData.portfolio.map(project => {
          // 创建项目的浅拷贝
          const optimizedProject = {...project};
          
          // 处理作品文件的渐进式加载
          if (optimizedProject.file && optimizedProject.file.startsWith('data:')) {
            // 确保项目有缩略图标记
            optimizedProject.hasFullContent = true;
            
            // 如果已有缩略图，则在保存时只保留缩略图，完整内容将在查看时按需加载
            if (optimizedProject.thumbnailFile) {
              // 将完整文件内容存储到单独的属性中
              optimizedProject.fullContentFile = optimizedProject.file;
              // 在主文件属性中只保留缩略图
              optimizedProject.file = null;
            }
          }
          
          // 处理封面图片的渐进式加载
          if (optimizedProject.fullImage && optimizedProject.fullImage.startsWith('data:')) {
            // 如果有缩略图封面，则在保存时优先使用缩略图
            if (optimizedProject.image && optimizedProject.image !== optimizedProject.fullImage) {
              // 将完整图片内容存储到单独的属性中，按需加载
              optimizedProject.fullContentImage = optimizedProject.fullImage;
              // 删除重复的完整图片数据以节省空间
              optimizedProject.fullImage = null;
            }
          }
          
          return optimizedProject;
        });
        
        // 将简历数据保存到localStorage，以便在个人主页中使用
        const resumeToSave = {
          ...resumeData,
          portfolio: optimizedPortfolio, // 使用优化后的portfolio
          id: newResumeId,
          lastUpdated: new Date().toISOString()
        };

        // 尝试序列化数据
        const serializedData = JSON.stringify(resumeToSave);
        if (!serializedData) {
          throw new Error('数据序列化失败');
        }

        // 检查数据大小
        const dataSize = new Blob([serializedData]).size;
        const maxSize = 5 * 1024 * 1024; // 假设localStorage最大限制为5MB
        
        if (dataSize > maxSize) {
          throw new Error('数据过大，请减少作品数量或图片大小');
        }

        try {
          // 尝试保存到localStorage
          localStorage.setItem('userResumeData', serializedData);
        } catch (storageError) {
          // 处理配额超出错误
          if (storageError.name === 'QuotaExceededError' || 
              storageError.message.includes('quota') || 
              storageError.message.includes('exceeded')) {
            throw new Error('存储空间已满，请清理浏览器缓存或减少作品数量');
          }
          throw storageError; // 重新抛出其他错误
        }
        
        // 验证数据是否成功保存
        const savedData = localStorage.getItem('userResumeData');
        if (!savedData) {
          throw new Error('数据保存失败');
        }

        // 显示成功提示
        setSaveStatus({
          show: true,
          type: 'success',
          message: '简历保存成功！正在返回个人主页...',
        });
        
        // 2秒后跳转到用户个人主页
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);

      } catch (error) {
        console.error('保存简历时出错:', error);
        setSaveStatus({
          show: true,
          type: 'error',
          message: `保存失败：${error.message}`,
        });
      }
    }, 1000);
  };
  
  // 如果未登录，显示登录页面
  // 移除这个条件判断，因为App.jsx中的路由配置已经确保了只有登录用户才能访问ShowYou组件
  // if (!isLoggedIn) {
  //   return <Login onLogin={handleLoginSuccess} />;
  // }
  
  // 如果显示预览，则渲染预览组件
  if (showPreview) {
    return (
      <>
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<ShareIcon />}
            onClick={() => setOpenShareDialog(true)}
            sx={{ boxShadow: 3 }}
          >
            分享简历
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => setShowPreview(false)}
            sx={{ boxShadow: 3, bgcolor: 'rgba(255,255,255,0.1)' }}
          >
            返回编辑
          </Button>
        </Box>
        <ResumePreview resumeData={resumeData} />
        
        {/* 分享简历对话框 */}
        <ShareResumeDialog
          open={openShareDialog}
          onClose={handleCloseShareDialog}
          resumeId={resumeId}
          resumeData={resumeData}
        />
      </>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 页面标题 */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #C9A47D 0%, #E5D3B3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SHOW YOURSELF
        </Typography>
        <Typography variant="h6" color="text.secondary">
          创建和编辑您的专业简历
        </Typography>
      </Box>
      
      {/* 保存状态提示 */}
      {saveStatus.show && (
        <Alert 
          severity={saveStatus.type} 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.5s ease',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(-20px)'
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)'
              }
            }
          }}
          onClose={() => setSaveStatus({...saveStatus, show: false})}
        >
          {saveStatus.message}
        </Alert>
      )}
      
      {/* 编辑区域 */}
      <Paper 
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        {/* 标签导航 */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="fullWidth"
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
            <Tab label="个人介绍" />
            <Tab label="作品集" />
            <Tab label="专业技能" />
            <Tab label="联系方式" />
          </Tabs>
        </Box>
        
        {/* 个人介绍编辑 */}
        {currentTab === 0 && (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              编辑个人介绍
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="姓名"
                  value={resumeData.about.name}
                  onChange={(e) => handleInputChange('about', 'name', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="职位"
                  value={resumeData.about.title}
                  onChange={(e) => handleInputChange('about', 'title', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="个人简介"
                  multiline
                  rows={4}
                  value={resumeData.about.bio}
                  onChange={(e) => handleInputChange('about', 'bio', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="工作经验"
                  multiline
                  rows={4}
                  value={resumeData.about.experience}
                  onChange={(e) => handleInputChange('about', 'experience', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* 作品集编辑 */}
        {currentTab === 1 && (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              编辑作品集
            </Typography>
            
            {/* 上传新作品 */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                border: '1px dashed rgba(201, 164, 125, 0.3)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                上传新作品
              </Typography>
              <UploadProject onUploadSuccess={handleUploadSuccess} userCategories={resumeData.categories || []} />
            </Paper>
            
            {/* 现有作品列表 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
              现有作品 ({resumeData.portfolio ? resumeData.portfolio.length : 0})
            </Typography>
            
            <Grid container spacing={3}>
              {Array.isArray(resumeData.portfolio) && resumeData.portfolio.length > 0 ? (
                resumeData.portfolio.map((project, index) => {
                  // 确保project是有效对象
                  if (!project) return null;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={project.id || `project-${index}`}>
                      <Paper
                        elevation={0}
                        onClick={() => handleProjectClick(project)}
                        sx={{
                          borderRadius: 2,
                          overflow: 'hidden',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 30px rgba(201, 164, 125, 0.15)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            height: 180,
                            backgroundImage: `url(${project.thumbnailCoverData || project.image || project.fullImage || '/images/portfolio-1.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: 'rgba(0,0,0,0.2)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            },
                            '&:hover::after': {
                              opacity: 1
                            }
                          }}
                        />
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {project.title || '未命名作品'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {project.category || '未分类'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {project.description || '无描述'}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {Array.isArray(project.tags) && project.tags.map((tag, tagIndex) => (
                              <Chip 
                                key={tagIndex} 
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
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                // 暂时不实现编辑功能，只阻止事件冒泡防止页面空白
                                console.log('编辑功能暂未实现', project.title);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                // 确保project.id存在，如果不存在则使用索引作为备选
                                handleDeleteProject(project.id || index);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 6,
                    bgcolor: 'rgba(0,0,0,0.1)',
                    borderRadius: 2 
                  }}>
                    <Typography color="text.secondary">暂无作品，请点击"上传新作品"添加</Typography>
                  </Box>
                </Grid>
              )}            
            </Grid>
          </Box>
        )}
        
        {/* 专业技能编辑 */}
        {currentTab === 2 && (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              编辑专业技能
            </Typography>
            
            {/* 添加新技能 */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                border: '1px dashed rgba(201, 164, 125, 0.3)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                添加新技能
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="技能名称"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(201, 164, 125, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(201, 164, 125, 0.4)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="熟练程度"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(201, 164, 125, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(201, 164, 125, 0.4)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddSkill}
                    sx={{ py: 1.5 }}
                  >
                    添加
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            
            {/* 现有技能列表 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
              现有技能 ({resumeData.skills.length})
            </Typography>
            
            <Grid container spacing={2}>
              {resumeData.skills.map((skill, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(201, 164, 125, 0.1)',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="primary.light">
                        {skill.level}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteSkill(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {/* 联系方式编辑 */}
        {currentTab === 3 && (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              编辑联系方式
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="电子邮箱"
                  value={resumeData.contact.email}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="电话号码"
                  value={resumeData.contact.phone}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="常驻地"
                  value={resumeData.contact.location}
                  onChange={(e) => handleInputChange('contact', 'location', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="微信"
                  value={resumeData.contact.social.weixin}
                  onChange={(e) => handleNestedInputChange('contact', 'social', 'weixin', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="微博"
                  value={resumeData.contact.social.weibo}
                  onChange={(e) => handleNestedInputChange('contact', 'social', 'weibo', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="小红书"
                  value={resumeData.contact.social.xiaohongshu}
                  onChange={(e) => handleNestedInputChange('contact', 'social', 'xiaohongshu', e.target.value)}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(201, 164, 125, 0.4)',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* 保存按钮 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSaveResume}
          disabled={saveStatus.show && saveStatus.type === 'info'}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: '1.1rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 25px rgba(201, 164, 125, 0.25)'
            },
            '&:active': {
              transform: 'translateY(-1px)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.2)',
              transform: saveStatus.show && saveStatus.type === 'success' ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.5s ease',
            }
          }}
        >
          {saveStatus.show && saveStatus.type === 'info' ? '保存中...' : '保存简历'}
        </Button>
      </Box>
      
      {/* 作品详情对话框 */}
      {selectedProject && (
        <ProjectDetailDialog 
          open={openDetailDialog}
          onClose={handleCloseDetailDialog}
          project={selectedProject}
        />
      )}
    </Container>
  );
};

export default ShowYou;