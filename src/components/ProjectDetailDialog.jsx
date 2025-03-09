import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ProjectDetailDialog = ({ open, onClose, project }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullContent, setFullContent] = useState(null);
  
  // 当对话框打开时，重置状态
  useEffect(() => {
    if (!open) {
      setFullContent(null);
    }
  }, [open]);
  
  if (!project) return null;

  // 加载完整内容
  const loadFullContent = () => {
    if (project.hasFullContent && !fullContent) {
      setIsLoading(true);
      // 模拟网络延迟，实际应用中可能是从服务器加载
      setTimeout(() => {
        // 根据存储位置获取完整内容
        // 1. 优先从fullContentFile加载（针对优化存储的情况）
        // 2. 其次从file属性加载（针对未优化存储的情况）
        // 3. 最后从fullContentImage加载（针对封面图片）
        if (project.fullContentFile) {
          setFullContent(project.fullContentFile);
        } else if (project.file) {
          setFullContent(project.file);
        } else if (project.fullContentImage) {
          setFullContent(project.fullContentImage);
        }
        setIsLoading(false);
      }, 800);
    }
  };


  // 根据文件类型渲染不同的内容
  const renderContent = () => {
    // 如果没有任何内容可显示
    if (!project.thumbnailFile && !project.file) {
      return (
        <Box sx={{ 
          textAlign: 'center', 
          py: 4,
          bgcolor: 'rgba(0,0,0,0.2)',
          borderRadius: 2 
        }}>
          <Typography color="text.secondary">无可预览内容</Typography>
        </Box>
      );
    }

    // 确定要显示的内容：优先使用已加载的完整内容，其次是缩略图，最后是原始文件
    const contentToShow = fullContent || project.thumbnailFile || project.file;
    
    if (project.fileType === 'image') {
      return (
        <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
          {isLoading && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: 8,
              zIndex: 1
            }}>
              <Typography color="white">加载高清图片中...</Typography>
            </Box>
          )}
          <img 
            src={contentToShow} 
            alt={project.title} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              cursor: project.hasFullContent && !fullContent ? 'pointer' : 'default',
              filter: isLoading ? 'blur(5px)' : 'none',
              transition: 'filter 0.3s ease'
            }} 
            onClick={loadFullContent}
          />
          {project.hasFullContent && !fullContent && !isLoading && (
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                mt: 1, 
                color: 'primary.light',
                cursor: 'pointer'
              }}
              onClick={loadFullContent}
            >
              点击加载高清图片
            </Typography>
          )}
        </Box>
      );
    } else if (project.fileType === 'video') {
      return (
        <Box sx={{ textAlign: 'center', mb: 3, position: 'relative' }}>
          {isLoading && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: 8,
              zIndex: 1
            }}>
              <Typography color="white">加载高清视频中...</Typography>
            </Box>
          )}
          <video 
            controls 
            src={contentToShow}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              filter: isLoading ? 'blur(5px)' : 'none',
              transition: 'filter 0.3s ease'
            }}
            onClick={project.hasFullContent && !fullContent ? loadFullContent : undefined}
          />
          {project.hasFullContent && !fullContent && !isLoading && (
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                mt: 1, 
                color: 'primary.light',
                cursor: 'pointer'
              }}
              onClick={loadFullContent}
            >
              点击加载高清视频
            </Typography>
          )}
        </Box>
      );
    } else {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 4, 
            mb: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(201, 164, 125, 0.1)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            cursor: project.hasFullContent && !fullContent ? 'pointer' : 'default',
          }}
          onClick={project.hasFullContent && !fullContent ? loadFullContent : undefined}
        >
          <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2, color: 'primary.light' }} />
          <Box>
            <Typography>
              此文件类型无法在浏览器中预览
            </Typography>
            {project.hasFullContent && !fullContent && !isLoading && (
              <Typography variant="caption" color="primary.light">
                点击加载完整文件
              </Typography>
            )}
          </Box>
        </Box>
      );
    }
  };

  // 渲染文件类型图标
  const renderFileTypeIcon = () => {
    if (!project.fileType) return null;
    
    if (project.fileType === 'image') {
      return <ImageIcon sx={{ mr: 1, color: 'primary.light' }} />;
    } else if (project.fileType === 'video') {
      return <VideocamIcon sx={{ mr: 1, color: 'primary.light' }} />;
    } else {
      return <InsertDriveFileIcon sx={{ mr: 1, color: 'primary.light' }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'linear-gradient(135deg, rgba(22,26,31,0.98) 0%, rgba(15,18,21,0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(201, 164, 125, 0.1)',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderFileTypeIcon()}
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {project.title}
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {renderContent()}
        
        <Paper elevation={0} sx={{ 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(22,26,31,0.7) 0%, rgba(15,18,21,0.7) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
        }}>
          <Typography variant="overline" color="primary.light" gutterBottom sx={{ display: 'block' }}>
            {project.category}
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            项目描述
          </Typography>
          
          <Typography paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {project.description}
          </Typography>
          
          <Divider sx={{ my: 2, borderColor: 'rgba(201, 164, 125, 0.1)' }} />
          
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
            标签
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {project.tags && project.tags.map((tag, index) => (
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
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;