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
      return res.status(401).json({ success: false, message: '未授权，无访问令牌' });
    }

    // 验证令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('身份验证错误:', error.message);
    return res.status(401).json({ success: false, message: '无效的令牌' });
  }
};

// @路由  GET /api/portfolios
// @描述  获取当前用户的所有作品集项目
// @访问  私有
router.get('/', protect, async (req, res) => {
  try {
    const portfolios = await mockService.findPortfoliosByUser(req.userId);

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios
    });
  } catch (error) {
    console.error('获取作品集错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  POST /api/portfolios
// @描述  创建新作品集项目
// @访问  私有
router.post('/', protect, async (req, res) => {
  try {
    const { title, category, description, image, tags, links, featured } = req.body;

    // 验证必要字段
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, message: '请提供必要的项目信息' });
    }

    // 创建新作品集项目
    const portfolio = await mockService.createPortfolio({
      user: req.userId,
      title,
      category,
      description,
      image: image || 'default-project.jpg',
      tags: tags || [],
      links: links || {},
      featured: featured || false
    });

    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('创建作品集项目错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  GET /api/portfolios/:id
// @描述  获取单个作品集项目
// @访问  私有
router.get('/:id', protect, async (req, res) => {
  try {
    const portfolio = await mockService.findPortfolioById(req.params.id);

    if (!portfolio || portfolio.user !== req.userId) {
      return res.status(404).json({ success: false, message: '未找到作品集项目' });
    }

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('获取作品集项目错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  PUT /api/portfolios/:id
// @描述  更新作品集项目
// @访问  私有
router.put('/:id', protect, async (req, res) => {
  try {
    let portfolio = await mockService.findPortfolioById(req.params.id);
    if (!portfolio || portfolio.user !== req.userId) {
      return res.status(404).json({ success: false, message: '未找到作品集项目' });
    }

    // 更新作品集项目
    portfolio = await mockService.updatePortfolio(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('更新作品集项目错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// @路由  DELETE /api/portfolios/:id
// @描述  删除作品集项目
// @访问  私有
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await mockService.findPortfolioById(req.params.id);
    if (!portfolio || portfolio.user !== req.userId) {
      return res.status(404).json({ success: false, message: '未找到作品集项目' });
    }

    await mockService.deletePortfolio(req.params.id);

    res.status(200).json({
      success: true,
      message: '作品集项目已删除'
    });
  }
  } catch (error) {
    console.error('删除作品集项目错误:', error.message);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;