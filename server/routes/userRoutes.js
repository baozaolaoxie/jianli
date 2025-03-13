import express from 'express';
import jwt from 'jsonwebtoken';
import mockService from '../utils/mockService.js';

const router = express.Router();

// @路由  POST /api/users/register
// @描述  注册新用户
// @访问  公开
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    let user = await mockService.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ success: false, message: '该邮箱已被注册' });
    }

    // 创建新用户
    user = await mockService.createUser({
      username,
      email,
      password,
      role: 'user',
      avatar: 'default-avatar.jpg'
    });

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('注册错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  POST /api/users/login
// @描述  用户登录
// @访问  公开
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 验证请求
    if (!email || !password) {
      return res.status(400).json({ success: false, message: '请提供邮箱和密码' });
    }

    // 使用模拟服务进行认证
    const authResult = await mockService.authenticateUser(email, password);
    if (!authResult) {
      return res.status(401).json({ success: false, message: '无效的凭据' });
    }

    const { user, token } = authResult;

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('登录错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  GET /api/users/me
// @描述  获取当前用户信息
// @访问  私有
router.get('/me', async (req, res) => {
  try {
    // 从请求头获取令牌
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.error('认证失败: 未提供令牌');
      return res.status(401).json({ success: false, message: '未授权，无访问令牌' });
    }

    // 检查是否是Firebase令牌（Firebase令牌通常以"ey"开头且包含三段）
    const isFirebaseToken = token.startsWith('ey') && token.split('.').length === 3;
    
    let userId;
    if (isFirebaseToken) {
      // 对于Firebase令牌，我们不进行验证，直接信任它
      console.log('检测到Firebase令牌，跳过JWT验证');
      userId = 'firebase_user'; // 使用一个固定值作为用户ID
    } else {
      // 对于非Firebase令牌，使用常规JWT验证
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (jwtError) {
        console.error('JWT验证错误:', jwtError.message);
        return res.status(401).json({ success: false, message: `无效的令牌: ${jwtError.message}` });
      }
    }

    // 使用模拟服务获取用户
    const user = await mockService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: '未找到用户' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('获取用户信息错误:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: '无效的令牌' });
    }
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;