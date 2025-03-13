import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Avatar, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import ShareResumeDialog from '../components/ShareResumeDialog';
import ResumePreview from '../components/ResumePreview';

const UserProfile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [resumeId, setResumeId] = useState('');

  // 从localStorage或后端获取用户简历数据
  useEffect(() => {
    // 首先尝试从localStorage获取用户最新保存的简历数据
    const savedResumeData = localStorage.getItem('userResumeData');
    
    if (savedResumeData) {
      // 如果存在已保存的简历数据，则使用它
      const parsedResumeData = JSON.parse(savedResumeData);
      setResumeData(parsedResumeData);
      setResumeId(parsedResumeData.id);
      console.log('从localStorage加载简历数据:', parsedResumeData);
    } else {
      // 如果没有已保存的简历数据，则使用默认模拟数据
      // 实际应用中，这里应该从后端API获取数据
      const mockResumeData = {
        id: '1687245896-1234',
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
            thumbnailCoverData: '/images/portfolio-1.jpg', // 添加缩略图数据字段
            tags: ['品牌宣传', '视频制作', '故事叙述']
          },
          {
            id: 2,
            title: '耐克运动系列平面广告',
            category: '平面设计',
            description: '为耐克新款运动系列设计的平面广告，强调产品性能与时尚设计的完美结合。',
            image: '/images/portfolio-2.jpg',
            thumbnailCoverData: '/images/portfolio-2.jpg', // 添加缩略图数据字段
            tags: ['平面广告', '品牌设计', '创意概念']
          },
          {
            id: 3,
            title: '宝马社交媒体营销活动',
            category: '数字营销',
            description: '为宝马设计的社交媒体整合营销活动，提升品牌在年轻消费群体中的影响力。',
            image: '/images/portfolio-3.jpg',
            thumbnailCoverData: '/images/portfolio-3.jpg', // 添加缩略图数据字段
            tags: ['社交媒体', '数字营销', '内容策略']
          },
        ],
        skills: [
          { name: 'Adobe Photoshop', level: '精通' },
          { name: 'Adobe Premiere', level: '精通' },
          { name: 'Adobe After Effects', level: '熟练' },
          { name: '品牌策略', level: '精通' },
          { name: '创意概念开发', level: '精通' },
          { name: '视觉设计', level: '精通' },
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
      };
      
      setResumeData(mockResumeData);
      setResumeId(mockResumeData.id);
    }
  }, []);

  // 编辑简历
  const handleEditResume = () => {
    // 导航到简历编辑页面，并传递简历ID
    navigate('/show-you', { state: { resumeId } });
  };

  // 分享简历
  const handleShareResume = () => {
    setOpenShareDialog(true);
  };

  // 关闭分享对话框
  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
  };

  // 如果简历数据还未加载，显示加载状态
  if (!resumeData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">加载中...</Typography>
      </Container>
    );
  }

  return (
    <>
      {/* 顶部操作栏 */}
      <Box 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 10, 
          bgcolor: 'rgba(18, 18, 18, 0.8)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(201, 164, 125, 0.1)',
          py: 2,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src="/images/profile.jpg"
                alt={user?.username || '用户头像'}
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  border: '2px solid rgba(201, 164, 125, 0.3)',
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {resumeData.about.name}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  {resumeData.about.title}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditResume}
                sx={{
                  borderColor: 'rgba(201, 164, 125, 0.3)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(201, 164, 125, 0.1)',
                  }
                }}
              >
                编辑简历
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShareIcon />}
                onClick={handleShareResume}
                sx={{
                  boxShadow: '0 4px 14px 0 rgba(201, 164, 125, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(201, 164, 125, 0.3)',
                  }
                }}
              >
                分享简历
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 简历内容 */}
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
};

export default UserProfile;