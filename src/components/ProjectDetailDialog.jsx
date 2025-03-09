import React from 'react';
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
  if (!project) return null;

  // 根据文件类型渲染不同的内容
  const renderContent = () => {
    if (!project.file) {
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

    if (project.fileType === 'image') {
      return (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img 
            src={project.file} 
            alt={project.title} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }} 
          />
        </Box>
      );
    } else if (project.fileType === 'video') {
      return (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <video 
            controls 
            src={project.file}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }} 
          >
            您的浏览器不支持视频播放。
          </video>
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
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
          }}
        >
          <InsertDriveFileIcon sx={{ fontSize: 40, mr: 2, color: 'primary.light' }} />
          <Typography>
            此文件类型无法在浏览器中预览
          </Typography>
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