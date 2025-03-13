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
    // 修复图片URL处理逻辑，按优先级使用可用的图片URL
    image: project.image || project.thumbnailCoverUrl || project.imageUrl || project.fullImage || null,
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
    // 修复高清图片URL处理逻辑
    fullContentImage: project.fullImage || project.fullContentImage || null
  };

  // 加载完整内容的函数
  const loadFullContent = () => {
    // 只有当项目有完整内容且尚未加载时才执行
    if (safeProject.hasFullContent && !fullContent) {
      // 设置加载状态为true，显示加载指示器
      setIsLoading(true);
      // 模拟网络延迟，实际应用中可能是从服务器加载
      setTimeout(() => {
        // 根据存储位置获取完整内容，按优先级顺序尝试不同来源
        // 1. 优先从fullContentFile加载（针对优化存储的情况）
        // 2. 其次从file属性加载（针对未优化存储的情况）
        // 3. 最后从fullContentImage加载（针对封面图片）
        if (safeProject.fullContentFile) {
          setFullContent(safeProject.fullContentFile);
        } else if (safeProject.file) {
          setFullContent(safeProject.file);
        } else if (safeProject.fullContentImage) {
          setFullContent(safeProject.fullContentImage);
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
    const contentToShow = fullContent || safeProject.image || safeProject.thumbnailFile || safeProject.file;
    
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
    } else {
      // 对于其他类型的文件，显示文件图标和名称
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4, 
            mb: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(0,0,0,0.2)' 
          }}
        >
          <InsertDriveFileIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="body1" gutterBottom>
            {safeProject.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            点击下载查看完整文件
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="overline" color="primary.light" gutterBottom sx={{ display: 'block' }}>
              {safeProject.category}
            </Typography>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
              {safeProject.title}
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ mt: -1, mr: -1 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3, pt: 1 }}>
        {/* 项目内容预览 */}
        {renderContent()}
        
        {/* 项目描述 */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            bgcolor: 'rgba(201, 164, 125, 0.05)'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            项目描述
          </Typography>
          <Typography variant="body1" paragraph>
            {safeProject.description}
          </Typography>
        </Paper>
        
        {/* 标签 */}
        {safeProject.tags && safeProject.tags.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              标签
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {safeProject.tags.map((tag, index) => (
                <Chip 
                  key={index} 
                  label={tag} 
                  sx={{
                    bgcolor: 'rgba(201, 164, 125, 0.1)',
                    color: 'primary.light',
                    borderRadius: 1,
                  }} 
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;