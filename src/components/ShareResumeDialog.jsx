import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Tooltip,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import QrCodeIcon from '@mui/icons-material/QrCode';

const ShareResumeDialog = ({ open, onClose, resumeId, resumeData }) => {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
  // 生成分享链接
  const shareUrl = `${window.location.origin}/resume/${resumeId}`;
  
  // 复制链接到剪贴板
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };
  
  // 通过微信分享
  const handleWechatShare = () => {
    setShowQRCode(true);
  };
  
  // 通过邮件分享
  const handleEmailShare = () => {
    const subject = `${resumeData.about.name}的个人简历`;
    const body = `您好，\n\n请查看我的个人简历：${shareUrl}\n\n${resumeData.about.name}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };
  
  // 通过WhatsApp分享
  const handleWhatsAppShare = () => {
    const text = `请查看我的个人简历：${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };
  
  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(201, 164, 125, 0.08)',
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
            <ShareIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              分享您的简历
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
          <Typography variant="body1" paragraph>
            您的简历已生成，可以通过以下链接分享给他人查看。分享链接无需登录即可访问。
          </Typography>
          
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              mb: 3, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 2,
              border: '1px solid rgba(201, 164, 125, 0.2)',
              background: 'rgba(22,26,31,0.5)',
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              value={shareUrl}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                sx: { fontSize: '0.9rem' }
              }}
              sx={{ mr: 2 }}
            />
            <Tooltip title="复制链接">
              <IconButton onClick={handleCopyLink} color="primary">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            通过以下方式分享
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<EmailIcon />}
              onClick={handleEmailShare}
              sx={{ 
                borderColor: 'rgba(201, 164, 125, 0.3)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(201, 164, 125, 0.1)',
                }
              }}
            >
              邮件
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<ChatIcon />}
              onClick={handleWechatShare}
              sx={{ 
                borderColor: 'rgba(201, 164, 125, 0.3)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(201, 164, 125, 0.1)',
                }
              }}
            >
              微信
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppShare}
              sx={{ 
                borderColor: 'rgba(201, 164, 125, 0.3)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(201, 164, 125, 0.1)',
                }
              }}
            >
              WhatsApp
            </Button>
          </Box>
          
          {showQRCode && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Divider sx={{ my: 2, borderColor: 'rgba(201, 164, 125, 0.1)' }} />
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                微信扫码分享
              </Typography>
              <Box 
                sx={{ 
                  width: 200, 
                  height: 200, 
                  mx: 'auto', 
                  bgcolor: 'white', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  p: 2,
                  mb: 2
                }}
              >
                <QrCodeIcon sx={{ fontSize: 150, color: '#333' }} />
                <Typography variant="caption" sx={{ position: 'absolute', color: '#333' }}>
                  二维码示例
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                扫描上方二维码，在微信中打开并分享
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            sx={{ 
              borderColor: 'rgba(201, 164, 125, 0.3)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(201, 164, 125, 0.1)',
              }
            }}
          >
            关闭
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.open(shareUrl, '_blank')}
          >
            预览简历
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={copied} 
        autoHideDuration={3000} 
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          链接已复制到剪贴板
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareResumeDialog;