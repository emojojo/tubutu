# Tubutu (农业种植指南) 整体设计与上下文规范 (Context)

为了确保未来所有新增的 UI 元素、插画、代码逻辑都能与项目当前的高级质感保持一致，特制定此全局上下文和设计规范文档。无论是人类开发者还是 AI 助手，在进行修改或新增内容前，请务必参考此文档。

## 1. 核心视觉风格 (Core Visual Identity)

Tubutu 旨在提供一种**“现代、轻量、高级且生机勃勃”**的视觉体验，打破传统农业 App 泥土感重、界面老旧的刻板印象。

- **整体 UI 风格**：现代简约风 (Minimalist)、苹果风 (Apple-esque)。
- **质感**：大量运用**毛玻璃效果 (Glassmorphism)**、圆角 (大圆角边框)、柔和的微投影 (Soft Drop Shadows)。
- **背景**：干净的纯白或非常浅的灰白色作为底色，突出内容本身。

## 2. 配色系统 (Color Palette)

- **主色调 (Primary)**：清新、充满活力的自然绿（如：`#4CAF50` 或更现代的 `#34C759`，用于主要按钮、高亮状态）。
- **辅助色 (Secondary/Accent)**：
  - 温暖的阳光黄 / 橘色（用于高亮特定提醒、开花/收获等阶段）。
  - 清澈的水蓝色（用于浇水、降雨等元素）。
- **文本颜色 (Text)**：
  - 主标题/重点文字：接近纯黑的深灰 (`#333333` 或 `#1C1C1E`)。
  - 次要文本/描述：中性灰 (`#666666` 或 `#8E8E93`)。
- **UI 背景 (Backgrounds)**：
  - 页面大背景：`#f5f7fa` 极浅的冷灰色。
  - 卡片背景：纯白 `#ffffff`，配合 `rgba(0,0,0,0.05)` 的极弱阴影。

## 3. 插画与图标规范 (Illustration & Iconography Style)

为了保证 App 内部所有图片的统一性，必须严格遵守以下生图/设计 Prompt 规范。目前项目的所有核心插画已统一为**“3D 粘土微缩景观风”**或**“写实极简白底风”**。

> [!IMPORTANT]
> **绝对禁止出现英文文字 (NO TEXT RULE)**：
> 由于本应用面向中国用户，AI 生成图片时极易产生无意义或不规范的英文标签和单词。因此，在所有的 Prompt 末尾，**必须强制加上：**
> `IMPORTANT: NO TEXT, NO WORDS, NO LETTERS, NO LABELS anywhere in the image. Pure illustration only.`
> 请用纯粹的插画本身来表达意图，绝对不要包含任何字符。

### 3.1 农事操作图标 (Operation Icons)
用于时间轴动作（如浇水、施肥）。统一采用 **3D 粘土动画风格 (3D Isometric Claymation)**。
- **标准 Prompt 示例**：
  > "3D isometric rendering, claymation style. A cute minimalist [具体动作/物品]. Pure white background, highly detailed, soft studio lighting."
- **处理要求**：必须使用裁切脚本去除多余白边与阴影，最大化填充 256x256 画布。

### 3.2 生物生长序列表 (Growth Sequence)
用于植物从小到大的生长过程（如种子、出苗、采收等）。统一采用 **极简写实植物插画风格 (Minimalist Botanical Illustration, Top-down)**。
- **标准 Prompt 示例**：
  > "Clean minimalist botanical illustration of [具体阶段，如 a small green sprout], top-down view, realistic but simplified vector art style. Isolated on a pure white background, no shadows."

### 3.3 栽培要点插画 (Cultivation Stages)
用于详情页中“栽培要点 / 核心阶段”的配图（如定植、打杈、授粉）。统一采用 **扁平化矢量插画风格 (Flat Vector Illustration, Line-art)**。
- **标准 Prompt 示例**：
  > "Clean flat vector illustration, simple elegant line art with muted pastel colors. A pair of hands [具体动作，如 tying a green vine to a wooden trellis]. Minimalist, pure white background, no shading."

### 3.4 蔬菜头像 (Crop Icons/Avatars)
用于替代原先 Emoji 的小图标。统一采用 **写实、极简、白底的高级质感风格**。
- **标准 Prompt 示例**：
  > "A realistic, concise, and focused icon of a single [蔬菜名称，如 green round cabbage head] on a pure white background. Minimalist, premium quality, highly detailed, centered."

### 3.5 蔬菜/作物主图 (Crop Main Banner Images)
用于卡片顶部的宽幅大图。统一采用 **高级商业美食/静物摄影风格，带丰富的环境背景**。
- **标准 Prompt 示例**：
  > "High quality commercial food photography of [具体作物，如 fresh strawberries], placed on an aesthetic rustic wooden table. Natural sunlight shining through, shallow depth of field, beautiful warm lighting, 8k resolution, hyper-detailed, organic lifestyle aesthetic."

## 4. UI 交互与前端规范 (UI/UX & Frontend Guidelines)

- **微交互 (Micro-interactions)**：所有按钮、卡片的 Hover 状态和 Active (点击) 状态都应该有平滑的过渡动画 (`transition: all 0.3s ease`)。点击时应有轻微的缩放 (`transform: scale(0.98)`) 或背景色加深。
- **响应式设计 (Responsive)**：采用移动端优先 (Mobile-first) 或灵活的自适应网格布局。操作面板 (如弹窗)、卡片在不同屏幕尺寸下需保持良好的间距。
- **避免使用 Emoji**：项目初期使用了 Emoji 作为分类或操作图标，目前已全面向**高品质定制图片 (`<img>` 标签)** 转型。新增功能时，请优先使用符合上述 `3.1` 规范的图片图标，不要退回到 Emoji。

## 5. 代码与项目结构 (Code & Architecture)

- **无框架原生开发**：目前基于原生 HTML/CSS/JS 构建。
- **数据管理**：核心农业数据 (蔬菜百科、病虫害、阶段信息等) 集中在 `data.js` 中。
- **状态与逻辑**：主要应用逻辑与 UI 渲染 (时间轴、图表、面板切换) 集中在 `app.js` 中。
- **缓存清除**：所有涉及 HTML/CSS/JS/图片 的更新，在部署前必须运行 `./deploy.sh`。该脚本会自动更新 `index.html` 中的版本查询参数（如 `?v=1779825469532`），确保客户端强制刷新缓存。

---
*注：本文档旨在约束未来的迭代方向。如果你作为 AI Agent 被要求开发新功能或生成新素材，请先阅读本文件以确保上下文不发生断层。*
