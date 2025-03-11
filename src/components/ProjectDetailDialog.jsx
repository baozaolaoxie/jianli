// 导入React核心库和钩子函数
import React, { useState, useEffect } from 'react';
// 导入Material UI组件
import {
  Dialog, // 对话框容器
  DialogContent, // 对话框内容区域
  DialogTitle, // 对话框标题
  IconButton, // 图标按钮
  Typography, // 文本排版组件
  Box, // 基础布局组件
  Chip, // 标签组件
  Stack, // 堆叠布局组件
  Divider, // 分隔线
  Paper // 卡片容器组件
} from '@mui/material';
// 导入Material UI图标
import CloseIcon from '@mui/icons-material/Close'; // 关闭图标
import ImageIcon from '@mui/icons-material/Image'; // 图片图标
import VideocamIcon from '@mui/icons-material/Videocam'; // 视频图标
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // 文件图标

// 项目详情对话框组件，用于展示作品的详细信息
const ProjectDetailDialog = ({ open, onClose, project }) => {
  // 内容加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 完整内容状态，用于存储高清图片或视频
  const [fullContent, setFullContent] = useState(null);
  
  // 当对话框打开状态变化时，重置内容状态
  useEffect(() => {
    // 当对话框关闭时，清空完整内容状态，以便下次打开时重新加载
    if (!open) {
      setFullContent(null);
    }
  }, [open]); // 依赖于open属性变化
  
  // 如果没有项目数据，不渲染任何内容
  if (!project) return null;
  
  // 确保project对象有所有必要的属性，防止访问undefined属性导致错误
  const safeProject = {
    id: project.id || Date.now(),
    title: project.title || '未命名作品',
    category: project.category || '未分类',
    description: project.description || '',
    image: project.image || null,
    thumbnailFile: project.thumbnailFile || null,
    file: project.file || null,
    // 根据文件类型判断fileType，如果未指定则根据文件扩展名推断
    fileType: project.fileType || (() => {
      if (!project.file && !project.image) return 'unknown';
      const fileName = project.file?.name || project.image;
      if (!fileName) return 'image';
      const ext = fileName.toLowerCase().split('.').pop();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
      if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video';
      return 'file';
    })(),
    tags: Array.isArray(project.tags) ? [...project.tags] : [],
    hasFullContent: project.hasFullContent || false,
    fullContentFile: project.fullContentFile || null,
    fullContentImage: project.fullContentImage || null
  };

  // 加载完整内容的函数
  const loadFullContent = () => {
    // 只有当项目有完整内容且尚未加载时才执行
    if (project.hasFullContent && !fullContent) {
      // 设置加载状态为true，显示加载指示器
      setIsLoading(true);
      // 模拟网络延迟，实际应用中可能是从服务器加载
      setTimeout(() => {
        // 根据存储位置获取完整内容，按优先级顺序尝试不同来源
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
        // 加载完成后，设置加载状态为false
        setIsLoading(false);
      }, 800); // 延迟800毫秒，模拟网络请求
    }
  };


  // 根据文件类型渲染不同的内容
  const renderContent = () => {
    // 如果没有任何内容可显示
    if (!safeProject.thumbnailFile && !safeProject.file && !safeProject.image) {
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

    // 确定要显示的内容：按优先级选择显示内容
    const contentToShow = fullContent || safeProject.thumbnailFile || safeProject.file || safeProject.image;
    
    // 根据文件类型渲染对应的内容
    const fileType = safeProject.fileType;
    if (fileType === 'image') {
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
            alt={safeProject.title}
            style={{ 
              maxWidth: '100%',
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              cursor: safeProject.hasFullContent && !fullContent ? 'pointer' : 'default',
              filter: isLoading ? 'blur(5px)' : 'none',
              transition: 'filter 0.3s ease'
            }}
            onClick={safeProject.hasFullContent && !fullContent ? loadFullContent : undefined}
          />
          {safeProject.hasFullContent && !fullContent && !isLoading && (
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
    } else if (fileType === 'video') {
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
            style={{ 
              maxWidth: '100%',
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              filter: isLoading ? 'blur(5px)' : 'none',
              transition: 'filter 0.3s ease'
            }}
            onClick={safeProject.hasFullContent && !fullContent ? loadFullContent : undefined}
          >
            <source src={contentToShow} type="video/mp4" />
            <source src={contentToShow} type="video/webm" />
            <source src={contentToShow} type="video/ogg" />
            您的浏览器不支持视频播放
          </video>
        </Box>
      );
    }
    // 其他文件类型显示默认图标
    return (
      <Box sx={{ 
        textAlign: 'center',
        py: 4,
        bgcolor: 'rgba(0,0,0,0.2)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <InsertDriveFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography color="text.secondary">{safeProject.title}</Typography>
      </Box>
    );
  };

  // 渲染文件类型图标
  const renderFileTypeIcon = () => {
    try {
      // 如果没有fileType属性，默认使用图片图标
      if (!project.fileType) {
        return <ImageIcon sx={{ mr: 1, color: 'primary.light' }} />;
      }
      
      // 根据文件类型渲染对应的内容
    const fileType = safeProject.fileType;
    if (fileType === 'image') {
        return <ImageIcon sx={{ mr: 1, color: 'primary.light' }} />;
      } else if (fileType === 'video') {
        return <VideocamIcon sx={{ mr: 1, color: 'primary.light' }} />;
      } else {
        return <InsertDriveFileIcon sx={{ mr: 1, color: 'primary.light' }} />;
      }
    } catch (error) {
      console.error('渲染文件类型图标时出错:', error);
      // 出错时返回默认图标
      return <ImageIcon sx={{ mr: 1, color: 'primary.light' }} />;
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