import React, { useState } from 'react';
import {
  Box, // 布局容器组件
  Paper, // 卡片容器组件
  Typography, // 文本排版组件
  TextField, // 文本输入框组件
  Button, // 按钮组件
  Container, // 居中容器组件
  Alert, // 提示信息组件
  IconButton, // 图标按钮组件
  InputAdornment, // 输入框装饰组件
  CircularProgress, // 加载指示器组件
  Tabs, // 标签页组件
  Tab, // 单个标签组件
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // 导入密码可见性切换图标
import { loginUser, registerUser, logoutUser } from '../utils/firebase.js'; // 导入Firebase认证功能

// 登录组件，接收登录成功回调函数作为属性
const Login = ({ onLogin }) => {
  // 当前活动标签页（登录/注册）
  const [activeTab, setActiveTab] = useState(0);
  // 表单数据状态，包含邮箱和密码
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  // 密码可见性状态
  const [showPassword, setShowPassword] = useState(false);
  // 错误信息状态
  const [error, setError] = useState('');
  // 成功信息状态
  const [success, setSuccess] = useState('');
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 处理标签页切换
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  // 处理表单输入变化的函数
  const handleChange = (e) => {
    // 解构获取输入框的名称和值
    const { name, value } = e.target;
    // 更新表单数据状态，保留其他字段不变
    setFormData({
      ...formData,
      [name]: value, // 使用计算属性名更新对应字段
    });
  };

  // 处理登录表单提交的函数
  const handleLoginSubmit = async (e) => {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 验证邮箱和密码是否填写
    if (formData.email && formData.password) {
      setLoading(true);
      setError('');
      
      try {
        // 调用Firebase登录功能
        const result = await loginUser(formData.email, formData.password);
        
        if (result.success) {
          // 保存认证令牌到localStorage
          const token = result.user.accessToken || result.user.stsTokenManager?.accessToken;
          localStorage.setItem('token', token);
          
          // 调用后端API进行登录验证
          try {
            const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password
              })
            });
            
            const data = await response.json();
            
            if (data.success) {
              // 登录成功，调用父组件传入的登录回调
              onLogin({
                email: formData.email,
                uid: result.user.uid,
                username: result.user.displayName || formData.email.split('@')[0],
                token: token
              });
            } else {
              // 后端验证失败
              setError(data.message || '登录失败，请检查邮箱和密码');
              setLoading(false);
            }
          } catch (apiError) {
            console.error('API调用错误:', apiError);
            // 如果后端API调用失败，仍然使用Firebase认证结果
            onLogin({
              email: formData.email,
              uid: result.user.uid,
              username: result.user.displayName || formData.email.split('@')[0],
              token: token
            });
          }
        } else {
          // 登录失败，设置错误信息
          setError(result.error || '登录失败，请检查邮箱和密码');
          setLoading(false);
        }
      } catch (err) {
        // 捕获异常，设置错误信息
        setError('登录过程中发生错误: ' + err.message);
        setLoading(false);
      }
    } else {
      // 如果邮箱或密码为空，设置错误信息
      setError('请填写邮箱和密码');
    }
  };

  // 处理注册表单提交的函数
  const handleRegisterSubmit = async (e) => {
    // 阻止表单默认提交行为
    e.preventDefault();
    
    // 验证表单字段
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
      setError('请填写所有必填字段');
      return;
    }
    
    // 验证密码匹配
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不匹配');
      return;
    }
    
    // 验证密码长度
    if (formData.password.length < 6) {
      setError('密码长度至少为6个字符');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // 调用Firebase注册功能
      const result = await registerUser(formData.email, formData.password);
      
      if (result.success) {
        // 获取Firebase认证令牌
        const token = result.user.accessToken || result.user.stsTokenManager?.accessToken;
        
        // 调用后端API注册用户
        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password
            })
          });
          
          const data = await response.json();
          
          if (data.success) {
            // 注册成功，显示成功消息并切换到登录标签
            setSuccess('注册成功！请使用您的新账户登录');
            setActiveTab(0);
            // 清空密码和确认密码字段
            setFormData({
              ...formData,
              password: '',
              confirmPassword: ''
            });
          } else {
            // 后端注册失败
            setError(data.message || '注册失败，请稍后再试');
          }
        } catch (apiError) {
          console.error('API调用错误:', apiError);
          // 如果后端API调用失败，仍然显示注册成功
          setSuccess('注册成功！请使用您的新账户登录');
          setActiveTab(0);
          // 清空密码和确认密码字段
          setFormData({
            ...formData,
            password: '',
            confirmPassword: ''
          });
        }
      } else {
        // 注册失败，设置错误信息
        setError(result.error || '注册失败，请稍后再试');
      }
    } catch (err) {
      // 捕获异常，设置错误信息
      setError('注册过程中发生错误: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理密码可见性切换的函数
  const handleClickShowPassword = () => {
    // 切换密码显示/隐藏状态
    setShowPassword(!showPassword);
  };

  return (
    // 使用Container组件限制内容最大宽度
    <Container maxWidth="sm">
      {/* 外层Box用于居中和垂直排列内容 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8, // 顶部外边距
        }}
      >
        {/* 登录/注册表单卡片容器 */}
        <Paper
          elevation={0} // 无阴影
          sx={{
            p: 4, // 内边距
            width: '100%', // 宽度占满容器
            borderRadius: 2, // 圆角
            background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)', // 渐变背景
            backdropFilter: 'blur(10px)', // 背景模糊效果
            border: '1px solid rgba(201, 164, 125, 0.08)', // 细边框
          }}
        >
          {/* 标签页切换 */}
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            centered
            sx={{
              mb: 3,
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
            <Tab label="登录" />
            <Tab label="注册" />
          </Tabs>
          
          {/* 标题，使用渐变文字效果 */}
          <Typography 
            variant="h4" 
            component="h1" 
            align="center"
            sx={{
              mb: 4,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #C9A47D 0%, #9E7B4F 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {activeTab === 0 ? '欢迎回来' : '创建账户'}
          </Typography>
          
          {/* 错误提示 */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 1,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                color: '#ff5252',
                '& .MuiAlert-icon': {
                  color: '#ff5252',
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          {/* 成功提示 */}
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: 1,
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                color: '#69f0ae',
                '& .MuiAlert-icon': {
                  color: '#69f0ae',
                }
              }}
            >
              {success}
            </Alert>
          )}
          
          {/* 登录表单 */}
          {activeTab === 0 && (
            <form onSubmit={handleLoginSubmit}>
              {/* 邮箱输入框 */}
              <TextField
                margin="normal" // 设置外边距
                required // 必填字段
                fullWidth // 宽度占满容器
                id="email" // 元素ID
                label="邮箱" // 标签文本
                name="email" // 表单字段名
                autoComplete="email" // 自动完成提示
                autoFocus // 自动获取焦点
                value={formData.email} // 绑定状态值
                onChange={handleChange} // 绑定变更处理函数
                sx={{
                  mb: 3, // 底部外边距
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(201, 164, 125, 0.2)', // 边框颜色
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(201, 164, 125, 0.4)', // 悬停时边框颜色
                    },
                  },
                }}
              />
              {/* 密码输入框 */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type={showPassword ? 'text' : 'password'} // 根据状态显示文本或密码
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                // 添加密码可见性切换按钮
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end" // 位于末尾
                      >
                        {/* 根据密码可见性状态显示不同图标 */}
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4, // 底部外边距
                  '& .MuiOutlinedInput-root': { // 自定义输入框样式
                    '& fieldset': {
                      borderColor: 'rgba(201, 164, 125, 0.2)', // 边框颜色
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(201, 164, 125, 0.4)', // 悬停时边框颜色
                    },
                  },
                }}
              />
              {/* 登录按钮 */}
              <Button
                type="submit" // 提交按钮类型
                fullWidth // 宽度占满容器
                variant="contained" // 实心按钮样式
                color="primary" // 主题色
                size="large" // 大尺寸
                disabled={loading} // 加载时禁用按钮
                sx={{
                  py: 1.5, // 垂直内边距
                  fontSize: '1.1rem', // 字体大小
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '登录'}
              </Button>
            </form>
          )}
          
          {/* 注册表单 */}
          {activeTab === 1 && (
            <form onSubmit={handleRegisterSubmit}>
              {/* 用户名输入框 */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="用户名"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
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
              {/* 邮箱输入框 */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="邮箱"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
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
              {/* 密码输入框 */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type={showPassword ? 'text' : 'password'}
                id="register-password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                helperText="密码长度至少为6个字符"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
              {/* 确认密码输入框 */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="确认密码"
                type={showPassword ? 'text' : 'password'}
                id="confirm-password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
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
              {/* 注册按钮 */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '注册'}
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;