// 存储工具模块 - 通过后端API代理阿里云OSS操作
import imageCompression from 'browser-image-compression';

// 图片压缩选项
const compressionOptions = {
  maxSizeMB: 1,          // 最大文件大小
  maxWidthOrHeight: 1920, // 最大宽度或高度
  useWebWorker: true     // 使用Web Worker加速
};

/**
 * 通过后端API上传图片到阿里云OSS（带压缩）
 * @param {File} imageFile - 图片文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, url: string, error: string}>}
 */
export const uploadImage = async (imageFile, path) => {
  try {
    // 压缩图片
    const compressedFile = await imageCompression(imageFile, compressionOptions);
    
    // 创建FormData对象
    const formData = new FormData();
    formData.append('image', compressedFile);
    formData.append('path', path || 'default');
    
    // 通过后端API上传
    const response = await fetch('/api/storage/upload-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // 添加认证令牌
      },
      body: formData
    });
    
    // 添加错误处理和调试信息
    if (!response.ok) {
      const errorText = await response.text();
      console.error('上传图片服务器响应错误:', response.status, errorText);
      return { success: false, error: `服务器响应错误: ${response.status} ${errorText}` };
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '图片上传失败');
    }
    
    return { success: true, url: data.url };
  } catch (error) {
    console.error('图片上传失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 通过后端API上传文件到阿里云OSS
 * @param {File} file - 文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, url: string, error: string}>}
 */
export const uploadFile = async (file, path) => {
  try {
    console.log(`开始上传文件: ${file.name}, 大小: ${file.size} 字节, 类型: ${file.type}, 路径: ${path}`);
    
    // 创建FormData对象
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path || 'default');
    
    // 获取token
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('上传文件失败: 未找到认证令牌');
      return { success: false, error: '未找到认证令牌，请先登录' };
    }
    
    // 通过后端API上传
    console.log('发送上传请求到服务器...');
    const response = await fetch('/api/storage/upload-file', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // 添加认证令牌
      },
      body: formData
    });
    
    // 添加错误处理和调试信息
    if (!response.ok) {
      const errorText = await response.text();
      console.error('上传文件服务器响应错误:', response.status, errorText);
      return { success: false, error: `服务器响应错误: ${response.status} ${errorText}` };
    }
    
    const data = await response.json();
    console.log('服务器响应数据:', data);
    
    if (!data.success) {
      throw new Error(data.message || '文件上传失败');
    }
    
    // 确保URL存在且有效
    if (!data.url) {
      console.error('服务器返回成功但没有提供URL');
      return { success: false, error: '服务器未返回有效的文件URL' };
    }
    
    console.log(`文件上传成功，URL: ${data.url}`);
    return { success: true, url: data.url };

  } catch (error) {
    console.error('文件上传失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 通过后端API删除阿里云OSS中的文件
 * @param {string} url - 文件URL或OSS路径
 * @returns {Promise<{success: boolean, error: string}>}
 */
export const deleteFile = async (url) => {
  try {
    // 通过后端API删除
    const response = await fetch('/api/storage/delete-file', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // 添加认证令牌
      },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '文件删除失败');
    }
    
    return { success: true };
  } catch (error) {
    console.error('文件删除失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 通过后端API获取指定目录下的所有文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, files: Array, error: string}>}
 */
export const listFiles = async (path) => {
  try {
    // 通过后端API获取文件列表
    const response = await fetch(`/api/storage/list-files?path=${encodeURIComponent(path)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // 添加认证令牌
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '获取文件列表失败');
    }
    
    return { success: true, files: data.files };
  } catch (error) {
    console.error('获取文件列表失败:', error);
    return { success: false, error: error.message };
  }
};

// 为了兼容旧代码，保留localStorage相关功能
const storageUtils = {
  // 存储数据
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('本地存储失败:', error);
      return false;
    }
  },
  
  // 获取数据
  getItem(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('本地读取失败:', error);
      return null;
    }
  },
  
  // 删除数据
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('本地删除失败:', error);
      return false;
    }
  }
};

export default storageUtils;