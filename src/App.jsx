import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShowYou from './pages/ShowYou';
import UserProfile from './pages/UserProfile';
import Login from './components/Login';

// 创建高级优雅的设计主题
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // 检查用户是否已登录
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  
  // 处理用户登录
  const handleLogin = (userData) => {
    // 保存用户数据到localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserData(userData);
    navigate('/profile');
  };
  
  // 处理用户登出
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isLoggedIn={isLoggedIn} userData={userData} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/show-you" element={
          isLoggedIn ? <ShowYou /> : <Navigate to="/login" />
        } />
        <Route path="/profile" element={
          isLoggedIn ? <UserProfile user={userData} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;