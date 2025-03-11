import mongoose from 'mongoose';

// 简历模型架构
const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  about: {
    name: {
      type: String,
      required: [true, '请提供姓名']
    },
    title: {
      type: String,
      required: [true, '请提供职位头衔']
    },
    bio: {
      type: String,
      required: [true, '请提供个人简介']
    },
    experience: String
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['入门', '熟练', '精通'],
      default: '熟练'
    }
  }],
  contact: {
    email: String,
    phone: String,
    location: String,
    social: {
      weixin: String,
      weibo: String,
      linkedin: String,
      xiaohongshu: String
    }
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareId: {
    type: String,
    unique: true,
    sparse: true // 允许多个文档的此字段为null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 生成唯一的分享ID
ResumeSchema.methods.generateShareId = function() {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

// 更新时间中间件
ResumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // 如果isPublic为true且没有shareId，则生成一个
  if (this.isPublic && !this.shareId) {
    this.shareId = this.generateShareId();
  }
  
  next();
});

export default mongoose.model('Resume', ResumeSchema);