import mongoose from 'mongoose';

// 作品集项目模型架构
const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, '请提供项目标题'],
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  category: {
    type: String,
    required: [true, '请提供项目类别'],
    enum: ['视频制作', '平面设计', '数字营销', '包装设计', '活动设计', '品牌策略', '其他'],
  },
  description: {
    type: String,
    required: [true, '请提供项目描述'],
    maxlength: [500, '描述不能超过500个字符']
  },
  image: {
    type: String,
    default: 'default-project.jpg'
  },
  tags: [{
    type: String,
    trim: true
  }],
  links: {
    website: String,
    video: String,
    document: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建索引以提高查询性能
PortfolioSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Portfolio', PortfolioSchema);