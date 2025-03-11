// 导入React核心库
import React from 'react';
// 导入ReactDOM客户端渲染方法
import ReactDOM from 'react-dom/client';
// 导入路由器组件
import { BrowserRouter } from 'react-router-dom';
// 导入应用主组件
import App from './App';
// 导入全局样式
import './index.css';

// 创建React根元素并渲染应用
ReactDOM.createRoot(document.getElementById('root')).render(
  // 严格模式，用于突出显示应用中潜在问题
  <React.StrictMode>
    {/* 使用BrowserRouter包裹应用，启用路由功能 */}
    <BrowserRouter>
      {/* 渲染主应用组件 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);