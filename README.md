# AI 键盘输入法

这是一个使用 React Native 构建的中文输入法应用程序演示，实现了基本的拼音输入功能。

## 功能特点

- 拼音输入法，支持汉字候选选择
- 符号键盘，支持输入数字和特殊符号
- 历史记录学习功能，记录用户常用输入
- 根据用户使用习惯排序候选词
- 支持设置界面，可清除历史记录

## 环境要求

- Node.js >=18
- React Native 0.80.0
- iOS 14.0+ / Android 5.0+
- CocoaPods (iOS 开发)

## 安装与运行

1. 克隆仓库

```bash
git clone https://github.com/yourusername/AiKeyboard.git
cd AiKeyboard
```

2. 安装依赖

```bash
npm install
```

3. iOS 开发额外步骤

```bash
cd ios
pod install
cd ..
```

4. 运行应用

```bash
# iOS
npm run ios

# Android
npm run android
```

## 目录结构

```
AiKeyboard/
├── src/
│   ├── components/       # 组件目录
│   │   ├── Keyboard/     # 键盘相关组件
│   │   │   ├── KeyboardView.tsx       # 基础键盘视图
│   │   │   ├── SymbolKeyboard.tsx     # 符号键盘视图
│   │   │   ├── CandidateBar.tsx       # 候选词组件
│   │   │   └── KeyboardContainer.tsx  # 键盘容器组件
│   │   ├── InputDemo.tsx  # 输入演示界面
│   │   └── SettingsScreen.tsx  # 设置界面
│   ├── utils/            # 工具类
│   │   ├── pinyinEngine.ts  # 拼音引擎
│   │   └── historyManager.ts  # 历史记录管理
│   └── navigation/       # 导航相关
│       └── AppNavigator.tsx  # 应用导航器
├── App.tsx              # 应用入口
└── ...
```

## 使用说明

1. 启动应用后，点击输入框激活自定义键盘
2. 使用拼音键盘输入汉字，点击候选词进行选择
3. 点击"123"按钮切换到符号键盘
4. 点击"ABC"按钮返回拼音键盘
5. 点击右上角"设置"进入设置界面
6. 在设置界面可以调整键盘反馈和清除历史记录

## 开发注意事项

- 本项目使用 TypeScript 开发，确保类型安全
- 使用 React Navigation 进行页面导航
- 使用 AsyncStorage 存储历史记录数据
- 键盘布局使用 flexbox 设计，支持不同屏幕尺寸

## 未来计划功能

- [ ] 支持语音输入
- [ ] 支持手写输入
- [ ] 支持表情符号库
- [ ] 支持自定义词库
- [ ] 支持云同步
- [ ] 优化拼音智能联想算法
- [ ] 支持多语言

## 许可证

MIT 许可证
