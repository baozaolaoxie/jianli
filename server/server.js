// 导入必要的模块
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 配置环境变量
dotenv.config();

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建Express应用
const app = express();

// 中间件配置
app.use(cors()); // 启用CORS
app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码的请求体

// 导入路由
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import storageRoutes from './routes/storageRoutes.js';

// 使用路由
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/storage', storageRoutes);

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 定义端口
const PORT = process.env.PORT || 5001;

// 启动服务器 - 使用模拟数据而不是连接MongoDB
console.log('使用模拟数据服务进行开发测试');
app.listen(PORT, () => {
  console.log(`服务器运行在端口: ${PORT}`);
});