// 阿里云OSS配置文件
import OSS from 'ali-oss';
import dotenv from 'dotenv';

// 确保环境变量已加载
dotenv.config();

// OSS配置信息
const ossConfig = {
  region: process.env.OSS_REGION || 'cn-beijing', // OSS区域，默认为北京
  accessKeyId: process.env.OSS_ACCESS_KEY_ID, // 访问密钥ID
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, // 访问密钥密码
  bucket: process.env.OSS_BUCKET, // OSS存储空间名称
  secure: true, // 使用HTTPS
  endpoint: `https://oss-${process.env.OSS_REGION || 'cn-beijing'}.aliyuncs.com`, // 明确指定endpoint
  cname: false, // 禁用自定义域名
  timeout: 60000, // 设置超时时间为60秒
  headerEncoding: 'utf-8' // 确保头信息编码正确
};

// 创建OSS客户端实例
let ossClient = null;

/**
 * 获取OSS客户端实例
 * @returns {OSS} OSS客户端实例
 */
export const getOSSClient = () => {
  if (!ossClient) {
    // 验证必要的配置信息
    if (!ossConfig.accessKeyId || !ossConfig.accessKeySecret || !ossConfig.bucket) {
      console.error('OSS配置信息不完整，请检查环境变量');
      throw new Error('OSS配置信息不完整');
    }
    
    // 初始化OSS客户端
    ossClient = new OSS(ossConfig);
  }
  return ossClient;
};

/**
 * 生成OSS对象的完整路径
 * @param {string} directory - 目录名称
 * @param {string} fileName - 文件名
 * @returns {string} 完整的OSS对象路径
 */
export const generateOSSPath = (directory, fileName) => {
  const timestamp = Date.now();
  
  // 处理文件名，解决中文和特殊字符问题
  // 1. 提取文件扩展名
  const lastDotIndex = fileName.lastIndexOf('.');
  const ext = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
  
  // 2. 获取不带扩展名的文件名并进行URL编码
  const nameWithoutExt = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
  const encodedName = encodeURIComponent(nameWithoutExt);
  
  // 3. 组合编码后的文件名和扩展名
  const safeFileName = encodedName + ext;
  
  return `${directory}/${timestamp}-${safeFileName}`;
};

/**
 * 获取文件的公共访问URL
 * @param {string} objectName - OSS对象名称
 * @returns {string} 文件的公共访问URL
 */
export const getPublicUrl = (objectName) => {
  const client = getOSSClient();
  // 生成URL，默认有效期为1小时
  return client.signatureUrl(objectName, { expires: 3600 });
};

/**
 * 获取永久访问URL（如果Bucket已配置为公共读取权限）
 * @param {string} objectName - OSS对象名称
 * @returns {string} 永久访问URL
 */
export const getPermanentUrl = (objectName) => {
  // 如果Bucket配置了公共读取权限，可以直接构造URL
  return `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com/${objectName}`;
};

export default {
  getOSSClient,
  generateOSSPath,
  getPublicUrl,
  getPermanentUrl,
};