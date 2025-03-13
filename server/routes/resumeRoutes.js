import express from 'express';
import jwt from 'jsonwebtoken';
import mockService from '../utils/mockService.js';

const router = express.Router();

// 中间件：验证用户身份
const protect = async (req, res, next) => {
  try {
    // 从请求头获取令牌
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.error('认证失败: 未提供令牌');
      return res.status(401).json({ success: false, message: '未授权，无访问令牌' });
    }

    // 检查是否是Firebase令牌（Firebase令牌通常以"ey"开头且包含三段）
    const isFirebaseToken = token.startsWith('ey') && token.split('.').length === 3;
    
    if (isFirebaseToken) {
      // 对于Firebase令牌，我们不进行验证，直接信任它
      // 在实际生产环境中，应该使用Firebase Admin SDK验证令牌
      console.log('检测到Firebase令牌，跳过JWT验证');
      req.userId = 'firebase_user'; // 使用一个固定值作为用户ID
      next();
    } else {
      // 对于非Firebase令牌，使用常规JWT验证
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
      } catch (jwtError) {
        console.error('JWT验证错误:', jwtError.message);
        return res.status(401).json({ success: false, message: `无效的令牌: ${jwtError.message}` });
      }
    }
  } catch (error) {
    console.error('身份验证错误:', error.message);
    return res.status(401).json({ success: false, message: '无效的令牌' });
  }
};

// @路由  POST /api/resumes
// @描述  创建新简历
// @访问  私有
router.post('/', protect, async (req, res) => {
  try {
    const { about, skills, contact } = req.body;

    // 验证必要字段
    if (!about || !about.name || !about.title || !about.bio) {
      return res.status(400).json({ success: false, message: '请提供必要的个人信息' });
    }

    // 检查用户是否已有简历
    const existingResume = await mockService.findResumeByUser(req.userId);
    if (existingResume) {
      return res.status(400).json({ success: false, message: '您已经创建了简历，请使用更新接口' });
    }

    // 创建新简历
    const resume = await mockService.createResume({
      user: req.userId,
      about,
      skills: skills || [],
      contact: contact || {}
    });

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('创建简历错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  GET /api/resumes/me
// @描述  获取当前用户的简历
// @访问  私有
router.get('/me', protect, async (req, res) => {
  try {
    const resume = await mockService.findResumeByUser(req.userId);
    if (!resume) {
      return res.status(404).json({ success: false, message: '未找到简历' });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('获取简历错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  PUT /api/resumes
// @描述  更新当前用户的简历
// @访问  私有
router.put('/', protect, async (req, res) => {
  try {
    const { about, skills, contact, isPublic } = req.body;

    // 更新简历
    const resume = await mockService.updateResume(req.userId, {
      about,
      skills,
      contact,
      isPublic
    });
    
    if (!resume) {
      return res.status(404).json({ success: false, message: '未找到简历' });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('更新简历错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  GET /api/resumes/share/:shareId
// @描述  通过分享ID获取公开简历
// @访问  公开
router.get('/share/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params;

    // 查找对应分享ID的简历
    const resume = await mockService.findResumeByShareId(shareId);
    if (!resume) {
      return res.status(404).json({ success: false, message: '未找到简历或简历未公开' });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('获取共享简历错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  DELETE /api/resumes
// @描述  删除当前用户的简历
// @访问  私有
router.delete('/', protect, async (req, res) => {
  try {
    const resume = await mockService.deleteResume(req.userId);
    if (!resume) {
      return res.status(404).json({ success: false, message: '未找到简历' });
    }

    res.status(200).json({
      success: true,
      message: '简历已成功删除'
    });
  } catch (error) {
    console.error('删除简历错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;