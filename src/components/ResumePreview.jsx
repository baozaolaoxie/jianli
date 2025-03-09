import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';
import TwitterIcon from '@mui/icons-material/Twitter';
import ProjectDetailDialog from './ProjectDetailDialog';

const ResumePreview = ({ resumeData }) => {
  const { about, portfolio, skills, contact } = resumeData;
  
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
        <Grid container spacing={3}>
          {portfolio.map((project, index) => (
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
                    backgroundImage: `url(${project.image})`,
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