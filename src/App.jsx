// 导入React核心库和钩子函数
import React, { useState, useEffect } from 'react';
// 导入路由相关组件
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// 导入Material UI主题相关组件
import { ThemeProvider, createTheme } from '@mui/material';
// 导入CSS基线组件，用于重置浏览器默认样式
import CssBaseline from '@mui/material/CssBaseline';
// 导入页面头部组件
import Header from './components/Header';
// 导入页面底部组件
import Footer from './components/Footer';
// 导入首页组件
import Home from './pages/Home';
// 导入简历展示页组件
import ShowYou from './pages/ShowYou';
// 导入用户资料页组件
import UserProfile from './pages/UserProfile';
// 导入登录组件
import Login from './components/Login';
// 导入Firebase登出功能
import { logoutUser } from './utils/firebase.js';

// 创建高级优雅的设计主题，定义应用的整体视觉风格
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C9A47D', // 高级金色
      light: '#E5D3B3',
      dark: '#9E7B4F',
    },
    secondary: {
      main: '#4A6670', // 深青色
      light: '#718E9B',
      dark: '#2D3E45',
    },
    background: {
      default: '#0F1215', // 深蓝黑色
      paper: '#161A1F',
    },
    text: {
      primary: '#F2F2F2',
      secondary: '#B8B8B8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.00833em',
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(201, 164, 125, 0.08)',
    '0px 4px 16px rgba(201, 164, 125, 0.12)',
    '0px 6px 20px rgba(201, 164, 125, 0.15)',
    // ... 其他阴影保持默认
    ...Array(21).fill(''),
  ].slice(0, 25),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 22px',
          boxShadow: '0 4px 14px 0 rgba(201, 164, 125, 0.12)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(201, 164, 125, 0.2)',
          },
        },
        contained: {
          backgroundImage: 'linear-gradient(135deg, #9E7B4F 0%, #C9A47D 100%)',
          border: '1px solid rgba(201, 164, 125, 0.3)',
        },
        outlined: {
          borderWidth: 1,
          borderColor: 'rgba(201, 164, 125, 0.5)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          background: 'linear-gradient(135deg, rgba(22,26,31,0.95) 0%, rgba(15,18,21,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 164, 125, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(201, 164, 125, 0.12)',
          },
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(201, 164, 125, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(15,18,21,0.75)',
          borderBottom: '1px solid rgba(201, 164, 125, 0.1)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0F1215 0%, #161A1F 100%)',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 50%, rgba(201, 164, 125, 0.08) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          },
          '&::after': {
            content: '""',
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '80%',
            height: '70%',
            background: 'radial-gradient(circle at 80% 80%, rgba(74, 102, 112, 0.08) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
            zIndex: -1,
          },
        },
      },
    },
  },
});

// 应用主组件
const App = () => {
  // 用户登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 用户数据
  const [userData, setUserData] = useState(null);
  // 获取导航函数，用于路由跳转
  const navigate = useNavigate();
  
  // 组件挂载时检查用户是否已登录，从本地存储获取用户数据
  useEffect(() => {
    // 从localStorage获取存储的用户数据
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      // 如果存在用户数据，设置登录状态为true
      setIsLoggedIn(true);
      // 解析并设置用户数据
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  
  // 处理用户登录逻辑
  const handleLogin = (userData) => {
    // 将用户数据序列化后保存到localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    // 更新登录状态为已登录
    setIsLoggedIn(true);
    // 设置用户数据
    setUserData(userData);
    // 登录成功后导航到用户资料页
    navigate('/profile');
  };
  
  // 处理用户登出逻辑
  const handleLogout = async () => {
    try {
      // 调用Firebase登出功能
      const result = await logoutUser();
      
      if (result.success) {
        // 从localStorage移除用户数据
        localStorage.removeItem('userData');
        // 更新登录状态为未登录
        setIsLoggedIn(false);
        // 清空用户数据
        setUserData(null);
        // 登出后导航到首页
        navigate('/');
      } else {
        console.error('登出失败:', result.error);
      }
    } catch (error) {
      console.error('登出过程中发生错误:', error);
    }
  };
  
  return (
    // 使用ThemeProvider提供主题上下文
    <ThemeProvider theme={theme}>
      {/* 应用CSS基线样式 */}
      <CssBaseline />
      {/* 渲染页面头部，传递登录状态、用户数据和登出处理函数 */}
      <Header isLoggedIn={isLoggedIn} userData={userData} onLogout={handleLogout} />
      {/* 定义应用路由 */}
      <Routes>
        {/* 首页路由 */}
        <Route path="/" element={<Home />} />
        {/* 登录页路由，已登录则重定向到个人资料页 */}
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />
        } />
        {/* 简历展示页路由，需要登录才能访问 */}
        <Route path="/show-you" element={
          isLoggedIn ? <ShowYou /> : <Navigate to="/login" />
        } />
        {/* 个人资料页路由，需要登录才能访问 */}
        <Route path="/profile" element={
          isLoggedIn ? <UserProfile user={userData} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
      </Routes>
      {/* 渲染页面底部 */}
      <Footer />
    </ThemeProvider>
  );
};

export default App;