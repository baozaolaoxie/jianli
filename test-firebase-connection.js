// 测试Firebase连接的脚本
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase配置
const firebaseConfig = {
  apiKey: "AIzaSyCqQqu7w4K2Il4TuEK0bEGbICX3iPlwjRI",
  authDomain: "showyourself-baozaolaoxie.firebaseapp.com",
  projectId: "showyourself-baozaolaoxie",
  storageBucket: "showyourself-baozaolaoxie.appspot.com",
  messagingSenderId: "48173332594",
  appId: "1:48173332594:web:745bd46074b78b5b7f2aeb",
  measurementId: "G-6DYCNHTMC3"
};

// 测试Firebase连接
async function testFirebaseConnection() {
  console.log('正在测试Firebase连接...');
  console.log('Firebase配置信息:', {
    apiKey: firebaseConfig.apiKey ? '已设置' : '未设置',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    appId: firebaseConfig.appId ? '已设置' : '未设置'
  });
  
  try {
    // 初始化Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase初始化成功!');
    console.log('已初始化的Firebase应用数量:', getApps().length);
    
    // 测试认证服务
    const auth = getAuth(app);
    console.log('Firebase认证服务初始化成功!');
    
    // 不再测试存储服务，已迁移到阿里云OSS
    
    // 测试分析服务
    try {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        const analytics = getAnalytics(app);
        console.log('Firebase分析服务初始化成功!');
      } else {
        console.log('当前环境不支持Firebase分析服务');
      }
    } catch (analyticsError) {
      console.log('Firebase分析服务初始化失败:', analyticsError.message);
    }
    
    console.log('测试完成，Firebase配置正确关联到应用程序。');
  } catch (error) {
    console.error('Firebase初始化失败:', error.message);
    console.error('错误详情:', error.code, error.name);
    
    // 检查常见错误
    if (error.code === 'app/invalid-app-credential') {
      console.error('错误原因: API密钥无效');
    } else if (error.code === 'app/invalid-api-key') {
      console.error('错误原因: API密钥格式不正确');
    } else if (error.code === 'app/unauthorized-domain') {
      console.error('错误原因: 当前域名未在Firebase控制台授权');
    }
  }
}

// 执行测试
testFirebaseConnection();