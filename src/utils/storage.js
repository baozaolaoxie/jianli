// 存储工具模块 - 基于Firebase Storage
import { storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

// 图片压缩选项
const compressionOptions = {
  maxSizeMB: 1,          // 最大文件大小
  maxWidthOrHeight: 1920, // 最大宽度或高度
  useWebWorker: true     // 使用Web Worker加速
};

/**
 * 上传图片到Firebase Storage（带压缩）
 * @param {File} imageFile - 图片文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, url: string, error: string}>}
 */
export const uploadImage = async (imageFile, path) => {
  try {
    // 压缩图片
    const compressedFile = await imageCompression(imageFile, compressionOptions);
    
    // 创建存储引用
    const storageRef = ref(storage, `images/${path}/${Date.now()}-${imageFile.name}`);
    
    // 上传文件
    const snapshot = await uploadBytes(storageRef, compressedFile);
    
    // 获取下载URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('图片上传失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 上传文件到Firebase Storage
 * @param {File} file - 文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, url: string, error: string}>}
 */
export const uploadFile = async (file, path) => {
  try {
    // 创建存储引用
    const storageRef = ref(storage, `files/${path}/${Date.now()}-${file.name}`);
    
    // 上传文件
    const snapshot = await uploadBytes(storageRef, file);
    
    // 获取下载URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('文件上传失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 删除Firebase Storage中的文件
 * @param {string} url - 文件URL
 * @returns {Promise<{success: boolean, error: string}>}
 */
export const deleteFile = async (url) => {
  try {
    // 从URL中提取存储路径
    const fileRef = ref(storage, url);
    
    // 删除文件
    await deleteObject(fileRef);
    
    return { success: true };
  } catch (error) {
    console.error('文件删除失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 获取指定目录下的所有文件
 * @param {string} path - 存储路径
 * @returns {Promise<{success: boolean, files: Array, error: string}>}
 */
export const listFiles = async (path) => {
  try {
    const listRef = ref(storage, path);
    const res = await listAll(listRef);
    
    // 获取所有文件的URL
    const filesPromises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url: url
      };
    });
    
    const files = await Promise.all(filesPromises);
    
    return { success: true, files };
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