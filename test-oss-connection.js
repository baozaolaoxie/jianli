// 测试阿里云OSS连接的脚本
import OSS from 'ali-oss';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量
dotenv.config();

// 创建OSS客户端
const client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
  secure: true,
  // 修正endpoint格式，应该是oss-cn-beijing.aliyuncs.com
  endpoint: `https://oss-${process.env.OSS_REGION}.aliyuncs.com`
});

// 测试OSS连接
async function testOSSConnection() {
  try {
    console.log('正在测试阿里云OSS连接...');
    console.log('OSS配置信息:', {
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID ? '已设置' : '未设置',
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET ? '已设置' : '未设置',
      bucket: process.env.OSS_BUCKET,
      endpoint: `https://oss-${process.env.OSS_REGION}.aliyuncs.com`
    });
    
    // 尝试列出所有存储桶
    const result = await client.listBuckets();
    console.log('连接成功! 存储桶列表:', result.buckets.map(b => b.name));
    
    // 尝试列出指定存储桶中的文件
    try {
      // 为特定存储桶操作创建新的客户端实例，使用存储桶特定的端点
      const bucketClient = new OSS({
        region: process.env.OSS_REGION,
        accessKeyId: process.env.OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
        bucket: process.env.OSS_BUCKET,
        secure: true,
        // 明确指定endpoint，确保与主客户端一致
        endpoint: `https://oss-${process.env.OSS_REGION}.aliyuncs.com`
      });
      
      const listResult = await bucketClient.list({
        prefix: '',
        'max-keys': 10
      });
      console.log(`存储桶 ${process.env.OSS_BUCKET} 中的文件:`, 
        listResult.objects ? listResult.objects.map(obj => obj.name) : '无文件');
    } catch (listError) {
      console.error('列出存储桶文件失败:', listError.message);
    }
  } catch (error) {
    console.error('OSS连接测试失败:', error.message);
    console.error('错误详情:', error.code, error.name);
    
    // 检查常见错误
    if (error.code === 'InvalidAccessKeyId') {
      console.error('错误原因: AccessKeyId无效或不存在');
    } else if (error.code === 'SignatureDoesNotMatch') {
      console.error('错误原因: AccessKeySecret不正确');
    } else if (error.code === 'NoSuchBucket') {
      console.error('错误原因: 存储桶不存在');
    }
  }
}

// 执行测试
testOSSConnection();