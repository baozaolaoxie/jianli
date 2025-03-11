// 模拟数据服务
import { v4 as uuidv4 } from 'uuid';

// 模拟用户数据
const mockUsers = [
  {
    _id: '60d0fe4f5311236168a109ca',
    username: 'testuser',
    email: 'test@example.com',
    avatar: 'default-avatar.jpg',
    role: 'user',
    createdAt: new Date('2023-01-01')
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    username: 'admin',
    email: 'admin@example.com',
    avatar: 'default-avatar.jpg',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

// 模拟简历数据
const mockResumes = [
  {
    _id: '60d0fe4f5311236168a109cc',
    user: '60d0fe4f5311236168a109ca',
    about: {
      name: '张三',
      title: 'UI/UX设计师',
      bio: '拥有5年设计经验的UI/UX设计师，专注于用户体验和界面设计。',
      experience: '5年设计经验'
    },
    skills: [
      { name: 'Figma', level: '精通' },
      { name: 'Adobe XD', level: '精通' },
      { name: 'Sketch', level: '熟练' },
      { name: 'UI设计', level: '精通' },
      { name: 'UX设计', level: '熟练' }
    ],
    contact: {
      email: 'zhangsan@example.com',
      phone: '13800138000',
      location: '北京',
      social: {
        weixin: 'zhangsan_wx',
        weibo: 'zhangsan_wb',
        linkedin: 'zhangsan_linkedin'
      }
    },
    isPublic: true,
    shareId: '1672531200000-abc123',
    updatedAt: new Date('2023-06-01'),
    createdAt: new Date('2023-01-01')
  }
];

// 模拟作品集数据
const mockPortfolios = [
  {
    _id: '60d0fe4f5311236168a109cd',
    user: '60d0fe4f5311236168a109ca',
    title: '电商App设计',
    category: '平面设计',
    description: '为某电商平台设计的移动应用界面，注重用户体验和转化率优化。',
    image: 'portfolio-1.jpg',
    tags: ['UI设计', 'UX设计', '移动应用'],
    links: {
      website: 'https://example.com/project1',
      video: 'https://example.com/video1',
      document: 'https://example.com/doc1'
    },
    featured: true,
    createdAt: new Date('2023-02-15')
  },
  {
    _id: '60d0fe4f5311236168a109ce',
    user: '60d0fe4f5311236168a109ca',
    title: '品牌重塑项目',
    category: '品牌策略',
    description: '为某传统企业进行的品牌重塑设计，包括logo、色彩系统和品牌指南。',
    image: 'portfolio-2.jpg',
    tags: ['品牌设计', 'Logo设计', '视觉识别'],
    links: {
      website: 'https://example.com/project2',
      video: 'https://example.com/video2',
      document: 'https://example.com/doc2'
    },
    featured: false,
    createdAt: new Date('2023-03-20')
  },
  {
    _id: '60d0fe4f5311236168a109cf',
    user: '60d0fe4f5311236168a109ca',
    title: '产品宣传视频',
    category: '视频制作',
    description: '为新产品发布制作的宣传视频，展示产品特性和使用场景。',
    image: 'portfolio-3.jpg',
    tags: ['视频制作', '动画', '产品宣传'],
    links: {
      website: 'https://example.com/project3',
      video: 'https://example.com/video3',
      document: 'https://example.com/doc3'
    },
    featured: true,
    createdAt: new Date('2023-04-10')
  }
];

// 模拟服务类
class MockService {
  // 用户相关方法
  async findUserById(id) {
    return mockUsers.find(user => user._id === id) || null;
  }

  async findUserByEmail(email) {
    return mockUsers.find(user => user.email === email) || null;
  }

  async createUser(userData) {
    const newUser = {
      _id: uuidv4(),
      ...userData,
      createdAt: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }

  // 简历相关方法
  async findResumeByUser(userId) {
    return mockResumes.find(resume => resume.user === userId) || null;
  }

  async findResumeByShareId(shareId) {
    return mockResumes.find(resume => resume.shareId === shareId && resume.isPublic) || null;
  }

  async createResume(resumeData) {
    const newResume = {
      _id: uuidv4(),
      ...resumeData,
      updatedAt: new Date(),
      createdAt: new Date()
    };
    mockResumes.push(newResume);
    return newResume;
  }

  async updateResume(userId, resumeData) {
    const index = mockResumes.findIndex(resume => resume.user === userId);
    if (index === -1) return null;
    
    mockResumes[index] = {
      ...mockResumes[index],
      ...resumeData,
      updatedAt: new Date()
    };
    
    return mockResumes[index];
  }

  async deleteResume(userId) {
    const index = mockResumes.findIndex(resume => resume.user === userId);
    if (index === -1) return null;
    
    const deletedResume = mockResumes[index];
    mockResumes.splice(index, 1);
    return deletedResume;
  }

  // 作品集相关方法
  async findPortfoliosByUser(userId) {
    return mockPortfolios.filter(portfolio => portfolio.user === userId);
  }

  async findPortfolioById(id) {
    return mockPortfolios.find(portfolio => portfolio._id === id) || null;
  }

  async createPortfolio(portfolioData) {
    const newPortfolio = {
      _id: uuidv4(),
      ...portfolioData,
      createdAt: new Date()
    };
    mockPortfolios.push(newPortfolio);
    return newPortfolio;
  }

  async updatePortfolio(id, portfolioData) {
    const index = mockPortfolios.findIndex(portfolio => portfolio._id === id);
    if (index === -1) return null;
    
    mockPortfolios[index] = {
      ...mockPortfolios[index],
      ...portfolioData
    };
    
    return mockPortfolios[index];
  }

  async deletePortfolio(id) {
    const index = mockPortfolios.findIndex(portfolio => portfolio._id === id);
    if (index === -1) return null;
    
    const deletedPortfolio = mockPortfolios[index];
    mockPortfolios.splice(index, 1);
    return deletedPortfolio;
  }

  // 认证相关方法
  async authenticateUser(email, password) {
    // 在真实环境中会比较加密后的密码，这里简化处理
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    
    // 模拟环境中，任何密码都认为是正确的
    return {
      user,
      token: `mock_token_${user._id}_${Date.now()}`
    };
  }
}

export default new MockService();