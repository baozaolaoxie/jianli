import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
  Fade,
  LinearProgress
} from '@mui/material';
import imageCompression from 'browser-image-compression';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const UploadProject = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: [],
  });
  
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailCover, setThumbnailCover] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const categories = [
    '视频制作',
    '平面设计',
    '数字营销',
    '包装设计',
    '活动设计',
    '品牌策略',
    '其他'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 压缩图片函数
  const compressImage = async (imageFile, maxSizeMB = 0.3, maxWidthOrHeight = 800) => {
    try {
      setCompressionProgress(10);
      const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
        onProgress: (progress) => {
          setCompressionProgress(progress * 100);
        }
      };
      
      const compressedFile = await imageCompression(imageFile, options);
      setCompressionProgress(100);
      
      // 延迟重置进度条，提供更好的用户体验
      setTimeout(() => setCompressionProgress(0), 1000);
      
      return compressedFile;
    } catch (error) {
      console.error('图片压缩失败:', error);
      setCompressionProgress(0);
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      setFileType('image');
      // 为图片创建缩略图
      const thumbnail = await compressImage(selectedFile);
      if (thumbnail) {
        setThumbnailFile(thumbnail);
      }
    } else if (selectedFile.type.startsWith('video/')) {
      setFileType('video');
      // 视频不进行压缩，但可以考虑提取第一帧作为缩略图
      // 这里简化处理，直接使用原视频
    } else {
      setFileType('file');
    }
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToDelete)
    });
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleClearFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFile(null);
    setFilePreview(null);
    setFileType(null);
    setThumbnailFile(null);
  };

  const handleCoverChange = async (e) => {
    const selectedCover = e.target.files[0];
    if (!selectedCover) return;
    if (!selectedCover.type.startsWith('image/')) {
      setUploadStatus({
        success: false,
        error: true,
        message: '封面必须是图片文件'
      });
      return;
    }
    setCover(selectedCover);
    
    // 为封面图片创建缩略图
    const thumbnail = await compressImage(selectedCover, 0.1, 400);
    if (thumbnail) {
      setThumbnailCover(thumbnail);
    }
    
    setCoverPreview(URL.createObjectURL(selectedCover));
  };

  const handleClearCover = () => {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }
    setCover(null);
    setCoverPreview(null);
    setThumbnailCover(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !file || !cover) {
      setUploadStatus({
        success: false,
        error: true,
        message: '请填写所有必填字段并上传作品文件和封面图片'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ success: false, error: false, message: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 将文件转换为base64
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };
      
      // 转换作品文件和封面图片
      // 使用缩略图作为预览，原始文件作为完整内容
      const fileData = file ? await fileToBase64(file) : null;
      const thumbnailFileData = thumbnailFile ? await fileToBase64(thumbnailFile) : null;
      const coverData = cover ? await fileToBase64(cover) : null;
      const thumbnailCoverData = thumbnailCover ? await fileToBase64(thumbnailCover) : null;
      
      const newProject = {
        id: Date.now(),
        ...formData,
        file: fileData,                   // 原始文件（完整质量）
        thumbnailFile: thumbnailFileData, // 缩略图文件（低质量，用于预览）
        fileType,
        image: thumbnailCoverData || coverData, // 优先使用缩略图封面
        fullImage: coverData,             // 保存原始封面图片
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        hasFullContent: true              // 标记有完整内容可加载
      };
      
      if (onUploadSuccess) {
        onUploadSuccess(newProject);
      }
      
      setFormData({ title: '', category: '', description: '', tags: [] });
      handleClearFile();
      handleClearCover();
      setUploadStatus({
        success: true,
        error: false,
        message: '作品上传成功！'
      });
    } catch (error) {
      console.error('上传失败:', error);
      setUploadStatus({
        success: false,
        error: true,
        message: '上传失败，请稍后重试'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderFilePreview = () => {
    if (!filePreview) return null;

    if (fileType === 'image') {
      return (
        <Box sx={{ position: 'relative', mb: 3 }}>
          <IconButton 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
            onClick={handleClearFile}
          >
            <CloseIcon />
          </IconButton>
          <>
            {compressionProgress > 0 && compressionProgress < 100 && (
              <Box sx={{ width: '100%', mb: 1 }}>
                <LinearProgress variant="determinate" value={compressionProgress} />
                <Typography variant="caption" color="text.secondary" align="center" display="block">
                  压缩中... {Math.round(compressionProgress)}%
                </Typography>
              </Box>
            )}
            <img 
              src={filePreview} 
              alt="预览" 
              style={{ 
                width: '100%', 
                borderRadius: 8, 
                maxHeight: '300px', 
                objectFit: 'cover' 
              }} 
            />
          </>
        </Box>
      );
    } else if (fileType === 'video') {
      return (
        <Box sx={{ position: 'relative', mb: 3 }}>
          <IconButton 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              zIndex: 1
            }}
            onClick={handleClearFile}
          >
            <CloseIcon />
          </IconButton>
          <video 
            src={filePreview} 
            controls 
            style={{ 
              width: '100%', 
              borderRadius: 8, 
              maxHeight: '300px' 
            }} 
          />
        </Box>
      );
    } else {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            mb: 3, 
            borderRadius: 2, 
            bgcolor: 'rgba(201, 164, 125, 0.1)' 
          }}
        >
          <InsertDriveFileIcon sx={{ mr: 2, color: 'primary.light' }} />
          <Typography sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {file.name}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleClearFile}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4,
        borderRadius: 2,
        background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(201, 164, 125, 0.08)',
      }}
    >
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          mb: 4,
          background: 'linear-gradient(90deg, #C9A47D, #E5D3B3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        上传新作品
      </Typography>

      {uploadStatus.success && (
        <Fade in={uploadStatus.success}>
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setUploadStatus({...uploadStatus, success: false})}
          >
            {uploadStatus.message}
          </Alert>
        </Fade>
      )}

      {uploadStatus.error && (
        <Fade in={uploadStatus.error}>
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setUploadStatus({...uploadStatus, error: false})}
          >
            {uploadStatus.message}
          </Alert>
        </Fade>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* 封面上传区域 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: 'primary.light', mb: 2 }}>
              上传封面图片 <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            {!coverPreview ? (
              <Box
                sx={{
                  border: '2px dashed rgba(201, 164, 125, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: 'rgba(201, 164, 125, 0.05)',
                  '&:hover': {
                    bgcolor: 'rgba(201, 164, 125, 0.08)',
                    borderColor: 'rgba(201, 164, 125, 0.5)',
                  },
                  mb: 3,
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => document.getElementById('cover-upload').click()}
              >
                <input
                  type="file"
                  id="cover-upload"
                  style={{ display: 'none' }}
                  onChange={handleCoverChange}
                  accept="image/*"
                />
                <ImageIcon sx={{ fontSize: 40, color: 'primary.light', mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  点击上传封面图片
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  仅支持图片文件
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', mb: 3 }}>
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    zIndex: 1
                  }}
                  onClick={handleClearCover}
                >
                  <CloseIcon />
                </IconButton>
                <img 
                  src={coverPreview} 
                  alt="封面预览" 
                  style={{ 
                    width: '100%', 
                    borderRadius: 8, 
                    height: '180px', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
            )}
          </Grid>
          
          {/* 作品文件上传区域 */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: 'primary.light', mb: 2 }}>
              上传作品文件 <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            {!filePreview ? (
              <Box
                sx={{
                  border: '2px dashed rgba(201, 164, 125, 0.3)',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: 'rgba(201, 164, 125, 0.05)',
                  '&:hover': {
                    bgcolor: 'rgba(201, 164, 125, 0.08)',
                    borderColor: 'rgba(201, 164, 125, 0.5)',
                  },
                  mb: 3,
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/*,video/*,application/pdf"
                />
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.light', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  点击或拖拽文件到此处上传
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  支持图片、视频和PDF文件
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImageIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.light' }} />
                    <Typography variant="caption" color="text.secondary">图片</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VideocamIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.light' }} />
                    <Typography variant="caption" color="text.secondary">视频</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InsertDriveFileIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.light' }} />
                    <Typography variant="caption" color="text.secondary">PDF</Typography>
                  </Box>
                </Stack>
              </Box>
            ) : (
              renderFilePreview()
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="作品标题"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
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

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">作品分类</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="作品分类"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="作品描述"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              multiline
              rows={4}
              variant="outlined"
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

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', mb: 1 }}>
              添加标签
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="输入标签后按回车添加"
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 1,
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
              <Button
                variant="contained"
                size="small"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                startIcon={<AddIcon />}
              >
                添加
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  sx={{
                    bgcolor: 'rgba(201, 164, 125, 0.1)',
                    color: 'primary.light',
                    '& .MuiChip-deleteIcon': {
                      color: 'primary.light',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isUploading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                position: 'relative',
              }}
            >
              {isUploading ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-12px',
                    }}
                  />
                  上传中...
                </>
              ) : (
                '上传作品'
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UploadProject;