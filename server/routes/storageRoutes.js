import express from 'express';
import jwt from 'jsonwebtoken';
import { getOSSClient, generateOSSPath, getPublicUrl } from '../../src/utils/aliyunOSS.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置临时文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    // 确保目录存在
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // 处理文件名，解决中文和特殊字符问题
    const originalName = file.originalname;
    const lastDotIndex = originalName.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? originalName.substring(lastDotIndex) : '';
    const nameWithoutExt = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    const encodedName = encodeURIComponent(nameWithoutExt);
    const safeFileName = encodedName + ext;
    
    cb(null, Date.now() + '-' + safeFileName);
  }
});

const upload = multer({ storage: storage });
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

/**
 * @路由  POST /api/storage/upload-image
 * @描述  上传图片到阿里云OSS（带压缩）
 * @访问  私有
 */
router.post('/upload-image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请提供图片文件' });
    }

    const imageFile = req.file;
    const path = req.body.path || 'default';

    console.log(`开始上传图片: ${imageFile.originalname} 到路径: ${path}`);

    try {
      // 获取OSS客户端
      const client = getOSSClient();
      
      // 生成OSS路径
      const ossPath = generateOSSPath(`images/${path}`, imageFile.originalname);
      console.log(`OSS路径: ${ossPath}`);
      
      // 读取临时文件
      const fileContent = fs.readFileSync(imageFile.path);
      
      // 上传文件到OSS
      const result = await client.put(ossPath, fileContent);
      
      // 删除临时文件
      fs.unlinkSync(imageFile.path);
      
      // 获取下载URL
      const downloadURL = result.url || getPublicUrl(ossPath);
      console.log(`图片上传成功，URL: ${downloadURL}`);
      
      return res.status(200).json({ success: true, url: downloadURL });
    } catch (ossError) {
      console.error('OSS操作错误:', ossError);
      return res.status(500).json({ 
        success: false, 
        message: '图片上传到OSS失败', 
        error: ossError.message,
        code: ossError.code || 'UNKNOWN_ERROR'
      });
    }
  } catch (error) {
    console.error('图片上传失败:', error);
    return res.status(500).json({ success: false, message: '图片上传失败', error: error.message });
  }
});

/**
 * @路由  POST /api/storage/upload-file
 * @描述  上传文件到阿里云OSS
 * @访问  私有
 */
router.post('/upload-file', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请提供文件' });
    }

    const file = req.file;
    const path = req.body.path || 'default';

    console.log(`开始上传文件: ${file.originalname} 到路径: ${path}`);

    try {
      // 获取OSS客户端
      const client = getOSSClient();
      
      // 生成OSS路径
      const ossPath = generateOSSPath(`files/${path}`, file.originalname);
      console.log(`OSS路径: ${ossPath}`);
      
      // 读取临时文件
      const fileContent = fs.readFileSync(file.path);
      
      // 对于大文件，使用分片上传
      let result;
      if (file.size > 5 * 1024 * 1024) { // 大于5MB的文件使用分片上传
        console.log(`文件大小超过5MB，使用分片上传: ${file.size} 字节`);
        try {
          // 确保OSS路径中的特殊字符被正确编码
          // 对于分片上传，路径中的特殊字符可能导致签名验证失败
          // 1. 解析路径和文件名
          const pathParts = ossPath.split('/');
          const fileName = pathParts.pop(); // 获取文件名部分
          const dirPath = pathParts.join('/'); // 获取目录路径部分
          
          // 2. 确保文件名被正确编码
          // 提取文件扩展名
          const lastDotIndex = fileName.lastIndexOf('.');
          const ext = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
          const nameWithoutExt = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
          
          // 对文件名部分进行编码，但保留扩展名
          // 使用encodeURIComponent确保所有特殊字符都被正确编码
          const safeFileName = encodeURIComponent(nameWithoutExt) + ext;
          
          // 3. 重新组合安全的OSS路径
          const safeOssPath = `${dirPath}/${safeFileName}`;
          console.log(`安全的OSS路径: ${safeOssPath}`);
          
          // 初始化分片上传
          const uploadId = await client.initMultipartUpload(safeOssPath);
          console.log(`分片上传初始化成功，uploadId: ${uploadId}`);
          
          // 计算分片数量，每片1MB
          const partSize = 1 * 1024 * 1024; // 1MB
          const partCount = Math.ceil(file.size / partSize);
          
          // 上传分片
          const parts = [];
          for (let i = 0; i < partCount; i++) {
            const start = i * partSize;
            const end = Math.min(file.size, start + partSize);
            const partBuffer = fileContent.slice(start, end);
            
            // 添加重试逻辑
            let retries = 0;
            const maxRetries = 3;
            let partSuccess = false;
            let part;
            
            while (!partSuccess && retries < maxRetries) {
              try {
                part = await client.uploadPart(
                  safeOssPath,
                  uploadId,
                  i + 1,
                  partBuffer
                );
                partSuccess = true;
              } catch (partError) {
                retries++;
                console.error(`分片 ${i+1}/${partCount} 上传失败，重试 ${retries}/${maxRetries}:`, partError.message);
                if (retries >= maxRetries) throw partError;
                // 等待一段时间再重试
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
            
            parts.push({
              number: i + 1,
              etag: part.etag
            });
            console.log(`分片 ${i+1}/${partCount} 上传完成`);
          }
          
          // 完成分片上传 - 使用安全的OSS路径
          result = await client.completeMultipartUpload(safeOssPath, uploadId, parts);
          console.log('分片上传完成，合并成功');
        } catch (multipartError) {
          console.error('分片上传失败，尝试直接上传:', multipartError.message);
          // 如果分片上传失败，尝试直接上传
          result = await client.put(ossPath, fileContent);
        }
      } else {
        // 小文件直接上传
        console.log(`文件大小小于5MB，使用直接上传: ${file.size} 字节`);
        result = await client.put(ossPath, fileContent);
      }
      
      // 删除临时文件
      fs.unlinkSync(file.path);
      
      // 获取下载URL
      const downloadURL = result.url || getPublicUrl(ossPath);
      console.log(`文件上传成功，URL: ${downloadURL}`);
      
      return res.status(200).json({ success: true, url: downloadURL });
    } catch (ossError) {
      console.error('OSS操作错误:', ossError);
      return res.status(500).json({ 
        success: false, 
        message: '文件上传到OSS失败', 
        error: ossError.message,
        code: ossError.code || 'UNKNOWN_ERROR'
      });
    }
  } catch (error) {
    console.error('文件上传失败:', error);
    return res.status(500).json({ success: false, message: '文件上传失败', error: error.message });
  }
});

/**
 * @路由  DELETE /api/storage/delete-file
 * @描述  删除阿里云OSS中的文件
 * @访问  私有
 */
router.delete('/delete-file', protect, async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ success: false, message: '请提供文件URL' });
    }
    
    // 从URL中提取OSS路径
    let ossPath = url;
    if (url.includes('aliyuncs.com')) {
      // 如果是完整URL，提取路径部分
      const urlObj = new URL(url);
      ossPath = urlObj.pathname.substring(1); // 去掉开头的斜杠
    }
    
    // 获取OSS客户端
    const client = getOSSClient();
    
    // 删除文件
    await client.delete(ossPath);
    
    return res.status(200).json({ success: true, message: '文件删除成功' });
  } catch (error) {
    console.error('文件删除失败:', error);
    return res.status(500).json({ success: false, message: '文件删除失败', error: error.message });
  }
});

export default router;