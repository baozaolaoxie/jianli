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
  // 用户登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
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
    contact: {
      email: '',
      phone: '',
      location: '',
      social: {
        weixin: '',
        weibo: '',
      },
    },
  });
  
  // 新技能输入
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  
  // 保存状态提示
  const [saveStatus, setSaveStatus] = useState({
    show: false,
    type: 'success',
    message: '',
  });
  
  // 处理登录成功
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // 实际应用中，这里应该从后端获取用户的简历数据
    // 这里使用模拟数据
    setResumeData({
      about: {
        name: '暴躁老谢',
        title: '创意导演',
        bio: '10年广告创意经验，专注于品牌故事讲述和视觉设计。',
        experience: '曾服务于多家国际知名品牌，包括可口可乐、耐克、宝马等。',
      },
      portfolio: [
        {
          id: 1,
          title: '可口可乐品牌宣传片',
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
      contact: {
        email: 'contact@example.com',
        phone: '+86 138 8888 8888',
        location: '上海市浦东新区陆家嘴金融贸易区',
        social: {
          weixin: 'wxid_example',
          weibo: '@暴躁老谢',
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
  
  // 处理作品上传成功
  const handleUploadSuccess = (newProject) => {
    setResumeData(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, newProject],
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
    setSelectedProject(project);
    setOpenDetailDialog(true);
  };
  
  // 处理详情对话框关闭
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
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
      // 实际应用中，这里应该将数据发送到后端保存
      console.log('保存简历数据:', resumeData);
      
      // 生成简历ID
      const newResumeId = generateResumeId();
      setResumeId(newResumeId);
      
      // 显示成功提示
      setSaveStatus({
        show: true,
        type: 'success',
        message: '简历保存成功！您的简历已更新。',
      });
      
      // 显示简历预览
      setShowPreview(true);
      
      // 5秒后隐藏提示
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    }, 1000);
  };
  
  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }
  
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
              <UploadProject onUploadSuccess={handleUploadSuccess} />
            </Paper>
            
            {/* 现有作品列表 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
              现有作品 ({resumeData.portfolio.length})
            </Typography>
            
            <Grid container spacing={3}>
              {resumeData.portfolio.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.id || index}>
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
                        backgroundImage: `url(${project.image})`,
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
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {project.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {project.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {project.tags && project.tags.map((tag, tagIndex) => (
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
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
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
      <ProjectDetailDialog 
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        project={selectedProject}
      />
    </Container>
  );
};

export default ShowYou;