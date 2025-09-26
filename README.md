# 个人作品集网站

一个现代化、响应式的个人作品集网站，用于展示项目和技能。

## 项目简介

这是一个使用纯HTML、CSS和JavaScript构建的个人作品集网站。网站采用现代化设计，具有完全响应式布局，能够在各种设备上完美显示。

## 功能特性

### 🎨 设计特性
- **响应式设计** - 适配桌面、平板和移动设备
- **现代化UI** - 简洁优雅的用户界面设计
- **流畅动画** - 丰富的CSS3动画和过渡效果
- **渐变色彩** - 现代化的渐变色彩搭配

### 🚀 交互功能
- **平滑滚动** - 页面内锚点导航平滑滚动
- **移动端菜单** - 响应式移动端汉堡包菜单
- **滚动动画** - 元素进入视口时的淡入动画
- **返回顶部** - 智能显示的返回顶部按钮
- **表单验证** - 实时表单验证和错误提示

### 📱 用户体验
- **快速加载** - 优化的代码和资源加载
- **无障碍访问** - 支持键盘导航和屏幕阅读器
- **跨浏览器兼容** - 支持现代浏览器
- **SEO友好** - 语义化HTML结构

## 文件结构

```
lab03/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── main.js            # JavaScript交互文件
├── images/            # 图片资源文件夹
│   ├── project1.jpg   # 项目1预览图
│   ├── project2.jpg   # 项目2预览图
│   └── project3.jpg   # 项目3预览图
└── README.md          # 项目说明文档
```

## 技术栈

### 前端技术
- **HTML5** - 语义化标记和现代HTML特性
- **CSS3** - Flexbox、Grid布局、动画和响应式设计
- **JavaScript (ES6+)** - 现代JavaScript特性和DOM操作

### 开发工具
- 支持任何现代代码编辑器（VS Code推荐）
- 支持Live Server扩展进行本地开发

## 快速开始

### 1. 克隆或下载项目
```bash
# 如果是Git仓库
git clone [repository-url]
cd lab03

# 或直接下载解压到lab03文件夹
```

### 2. 图片资源说明
项目已经使用高质量的在线图片：
- 现代化Web应用界面图片（来自Unsplash）
- 响应式电商网站界面图片（来自Unsplash）  
- 移动端天气应用界面图片（来自Unsplash）

如需使用自定义图片，可将图片放置在 `images/` 文件夹中，推荐尺寸：400x300像素，格式：JPG/PNG

### 3. 运行网站

#### 方法一：使用VS Code Live Server
1. 在VS Code中打开项目文件夹
2. 安装Live Server扩展
3. 右键点击 `index.html`
4. 选择 "Open with Live Server"

#### 方法二：使用Python简单服务器
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
然后在浏览器中访问 `http://localhost:8000`

#### 方法三：直接打开文件
双击 `index.html` 文件在浏览器中打开（某些功能可能受限）

### 4. 自定义内容
编辑 `index.html` 文件，修改以下内容：
- 个人信息（姓名、联系方式等）
- 技能列表
- 项目介绍
- 社交媒体链接

## 自定义指南

### 修改个人信息
在 `index.html` 中找到并修改：
```html
<!-- 导航栏标题 -->
<h1 class="nav-logo">我的作品集</h1>

<!-- 首页标题 -->
<h1 class="hero-title">欢迎来到我的作品集</h1>

<!-- 联系信息 -->
<div class="contact-item">
    <strong>邮箱:</strong> your.email@example.com
</div>
```

### 添加新项目
在作品集部分复制现有的 `.portfolio-item` 结构：
```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <img src="images/your-project.jpg" alt="项目名称" loading="lazy">
    </div>
    <div class="portfolio-content">
        <h3>您的项目名称</h3>
        <p>项目描述...</p>
        <div class="portfolio-links">
            <a href="#" class="btn-demo">在线演示</a>
            <a href="#" class="btn-code">源代码</a>
        </div>
    </div>
</div>
```

### 修改颜色主题
在 `styles.css` 中修改CSS变量或直接修改颜色值：
```css
/* 主要颜色 */
background: linear-gradient(45deg, #3498db, #2ecc71);

/* 或者定义CSS变量 */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #333;
}
```

### 添加新的动画效果
在 `main.js` 中的 `initializeAnimations()` 函数中添加：
```javascript
// 自定义动画
const customElements = document.querySelectorAll('.custom-animate');
customElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
});
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 性能优化

### 已实现的优化
- **图片懒加载** - 使用Intersection Observer API
- **事件节流** - 滚动事件性能优化
- **CSS动画** - 使用transform和opacity进行硬件加速
- **代码分离** - CSS和JavaScript分离到独立文件

### 建议的优化
- 压缩图片（使用TinyPNG或类似工具）
- 启用Gzip压缩（服务器配置）
- 使用CDN加速静态资源
- 添加Service Worker实现离线访问

## 部署建议

### 静态网站托管平台
- **GitHub Pages** - 免费，支持自定义域名
- **Netlify** - 免费，支持持续部署
- **Vercel** - 免费，快速部署
- **Firebase Hosting** - 谷歌云平台

### 部署步骤（以GitHub Pages为例）
1. 将项目上传到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择源分支（通常是main或master）
4. 访问提供的GitHub Pages链接

## 常见问题

### Q: 图片无法显示怎么办？
A: 确保图片文件放在 `images/` 文件夹中，文件名与HTML中的引用一致。

### Q: 动画效果不工作？
A: 检查浏览器控制台是否有JavaScript错误，确保 `main.js` 文件正确加载。

### Q: 移动端菜单无法点击？
A: 检查JavaScript是否正常加载，确保没有其他脚本冲突。

### Q: 表单提交后没有反应？
A: 当前是演示版本，表单提交只是模拟。要实现真实提交，需要后端服务器支持。

## 后续开发计划

- [ ] 添加暗色主题切换
- [ ] 集成博客功能
- [ ] 添加多语言支持
- [ ] 实现真实的表单提交
- [ ] 添加项目筛选功能
- [ ] 集成社交媒体API

## 贡献指南

欢迎提交Issues和Pull Requests来改进这个项目！

1. Fork这个项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 许可证

这个项目使用MIT许可证。详情请查看LICENSE文件。

## 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 邮箱：your.email@example.com
- GitHub：[@yourusername](https://github.com/yourusername)

---

**感谢使用这个个人作品集模板！** 🎉

如果这个项目对您有帮助，请考虑给它一个星标 ⭐