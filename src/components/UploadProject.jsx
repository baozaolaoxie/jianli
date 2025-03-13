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
  LinearProgress,
  Divider
} from '@mui/material';
import imageCompression from 'browser-image-compression';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const UploadProject = ({ onUploadSuccess, userCategories = [] }) => {
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
  
  // 自定义分类相关状态
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [customCategories, setCustomCategories] = useState([...userCategories]);

  // 默认分类列表
  const defaultCategories = [
    '视频制作',
    '平面设计',
    '数字营销',
    '包装设计',
    '活动设计',
    '品牌策略',
    '其他'
  ];

  // 合并默认分类和用户自定义分类
  const categories = [...new Set([...defaultCategories, ...customCategories])];
  
  // 添加自定义分类
  const handleAddCustomCategory = () => {
    if (customCategoryInput.trim() && !categories.includes(customCategoryInput.trim())) {
      const newCategory = customCategoryInput.trim();
      setCustomCategories(prev => [...prev, newCategory]);
      setFormData(prev => ({
        ...prev,
        category: newCategory
      }));
      setCustomCategoryInput('');
      setShowCustomCategoryInput(false);
    }
  };
  
  // 处理自定义分类输入框按键事件
  const handleCustomCategoryKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomCategory();
    } else if (e.key === 'Escape') {
      setShowCustomCategoryInput(false);
      setCustomCategoryInput('');
    }
  };

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
    
    // 修改验证逻辑，使用filePreview和coverPreview来判断文件是否已上传
    // 因为这些状态变量在文件上传成功后一定会被设置
    if (!formData.title || !formData.category || !formData.description) {
      setUploadStatus({
        success: false,
        error: true,
        message: '请填写所有必填字段（标题、分类和描述）'
      });
      return;
    }
    
    if (!filePreview) {
      setUploadStatus({
        success: false,
        error: true,
        message: '请上传作品文件'
      });
      return;
    }
    
    if (!coverPreview) {
      setUploadStatus({
        success: false,
        error: true,
        message: '请上传封面图片'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ success: false, error: false, message: '' });

    try {
      // 检查用户是否已登录
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录状态，请先登录后再上传作品');
      }

      // 导入存储工具
      const { uploadFile, uploadImage } = await import('../utils/storage.js');
      
      // 上传原始文件
      let fileUrl = null;
      let thumbnailFileUrl = null;
      let coverUrl = null;
      let thumbnailCoverUrl = null;
      
      // 设置上传进度提示
      setUploadStatus({
        success: false,
        error: false,
        message: '正在上传文件，请稍候...'
      });
      
      // 上传原始文件
      if (file) {
        setUploadStatus({
          success: false,
          error: false,
          message: '正在上传作品文件...'
        });
        const fileResult = await uploadFile(file, `projects/${formData.category}`);
        if (!fileResult.success) {
          throw new Error(`作品文件上传失败: ${fileResult.error}`);
        }
        fileUrl = fileResult.url;
        console.log('文件上传成功，URL:', fileUrl); // 添加日志以便调试
      }
      
      // 上传缩略图文件（如果存在）
      if (thumbnailFile) {
        setUploadStatus({
          success: false,
          error: false,
          message: '正在上传作品缩略图...'
        });
        const thumbnailResult = await uploadImage(thumbnailFile, `projects/${formData.category}/thumbnails`);
        if (!thumbnailResult.success) {
          throw new Error(`缩略图上传失败: ${thumbnailResult.error}`);
        }
        thumbnailFileUrl = thumbnailResult.url;
      }
      
      // 上传封面图片
      if (cover) {
        setUploadStatus({
          success: false,
          error: false,
          message: '正在上传封面图片...'
        });
        const coverResult = await uploadImage(cover, `projects/${formData.category}/covers`);
        if (!coverResult.success) {
          throw new Error(`封面上传失败: ${coverResult.error}`);
        }
        coverUrl = coverResult.url;
      }
      
      // 上传缩略图封面（如果存在）
      if (thumbnailCover) {
        setUploadStatus({
          success: false,
          error: false,
          message: '正在上传封面缩略图...'
        });
        const thumbnailCoverResult = await uploadImage(thumbnailCover, `projects/${formData.category}/covers/thumbnails`);
        if (!thumbnailCoverResult.success) {
          throw new Error(`缩略图封面上传失败: ${thumbnailCoverResult.error}`);
        }
        thumbnailCoverUrl = thumbnailCoverResult.url;
      }
      
      // 确保缩略图封面URL存在，如果不存在则使用原始封面URL
      const finalThumbnailCoverUrl = thumbnailCoverUrl || coverUrl;
      
      const newProject = {
        id: Date.now(),
        ...formData,
        fileUrl,                      // 原始文件URL（完整质量）
        thumbnailFileUrl,             // 缩略图文件URL（低质量，用于预览）
        fileType,
        // 修复关键问题：确保设置image属性，这是Portfolio组件期望的属性名
        image: finalThumbnailCoverUrl, // 设置image属性为封面URL
        imageUrl: finalThumbnailCoverUrl, // 使用优化后的缩略图封面URL作为主图片显示
        thumbnailCoverUrl: finalThumbnailCoverUrl, // 存储缩略图封面的URL
        fullImage: coverUrl,       // 保存原始封面图片的URL
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        hasFullContent: true          // 标记有完整内容可加载
      };
      
      // 添加调试日志
      console.log('准备传递给Portfolio组件的项目数据:', newProject);
      
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
        message: `上传失败: ${error.message || '请稍后重试'}`
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
      sx={{ p: 4, borderRadius: 2 }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        上传新作品
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="作品标题"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">作品分类</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="作品分类"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
                <MenuItem value="custom" onClick={() => setShowCustomCategoryInput(true)}>
                  <AddIcon fontSize="small" sx={{ mr: 1 }} />
                  添加自定义分类
                </MenuItem>
              </Select>
            </FormControl>
            
            {showCustomCategoryInput && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  label="自定义分类名称"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  onKeyDown={handleCustomCategoryKeyDown}
                  autoFocus
                  variant="outlined"
                />
                <Button 
                  onClick={handleAddCustomCategory} 
                  sx={{ ml: 1 }}
                  variant="contained"
                >
                  添加
                </Button>
                <IconButton 
                  onClick={() => setShowCustomCategoryInput(false)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
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
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                标签
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="添加标签"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddTag}
                  startIcon={<AddIcon />}
                  size="medium"
                >
                  添加
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              上传作品文件
            </Typography>
            {!filePreview ? (
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ 
                  width: '100%', 
                  height: '120px', 
                  border: '2px dashed', 
                  borderColor: 'primary.light',
                  borderRadius: 2
                }}
              >
                选择文件
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*,video/*,application/pdf"
                />
              </Button>
            ) : renderFilePreview()}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              上传封面图片
            </Typography>
            {!coverPreview ? (
              <Button
                component="label"
                variant="outlined"
                startIcon={<ImageIcon />}
                sx={{ 
                  width: '100%', 
                  height: '120px', 
                  border: '2px dashed', 
                  borderColor: 'primary.light',
                  borderRadius: 2
                }}
              >
                选择封面图片
                <input
                  type="file"
                  hidden
                  onChange={handleCoverChange}
                  accept="image/*"
                />
              </Button>
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
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
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
                    maxHeight: '300px', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
            )}
          </Grid>
          
          {(uploadStatus.success || uploadStatus.error) && (
            <Grid item xs={12}>
              <Fade in={true}>
                <Alert 
                  severity={uploadStatus.success ? "success" : "error"}
                  onClose={() => setUploadStatus({ success: false, error: false, message: '' })}
                >
                  {uploadStatus.message}
                </Alert>
              </Fade>
            </Grid>
          )}
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isUploading}
              startIcon={isUploading ? null : <CloudUploadIcon />}
              sx={{ position: 'relative', py: 1.5 }}
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