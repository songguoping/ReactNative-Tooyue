# 途悦
[![Download](https://img.shields.io/badge/Download-v1.0.0-ff69b4.svg) ](https://github.com/songguoping/ReactNative-Tooyue/releases/download/v1.0.0/com.codersong.tooyue_1.0.0.apk)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/songguoping/ReactNative-Tooyue/pulls)
[![GitHubPopular release](https://img.shields.io/github/release/songguoping/ReactNative-Tooyue.svg?maxAge=2592000?style=flat-square)](https://github.com/songguoping/ReactNative-Tooyue/releases)
[![language English](https://img.shields.io/badge/language-English-feb252.svg)](README.md)

这是一款上下班途中打发时间的 app，主要可以阅读每天的新闻资讯，同时还可以欣赏美女写真，缓解一天的疲劳。它基于 React Native 支持 Android 和 iOS 双平台。

## 目录

* [预览](##预览)
* [截图](##截图)
* [功能与特性](##功能与特性)
* [环境需求](##环境需求)
* [依赖库](##依赖库)
* [运行](##运行)
* [计划](##计划)
* [License](##License)

## 预览

![Preview](http://p0ufe2pi4.bkt.clouddn.com/tooyue/ios_show.m4v)
![Preview](http://p0ufe2pi4.bkt.clouddn.com/tooyue/android_show.m4v)

## 截图

<img src="resource/screenshots/tab_home.png" width="280">
<img src="resource/screenshots/tab_pic.png" width="280">
<img src="resource/screenshots/tab_me.png" width="280">
<img src="resource/screenshots/webview.png" width="280">
<img src="resource/screenshots/my_favorite.png" width="280">

## 功能与特性

- [x] react-navigation 实现页面导航跳转
- [x] 使用 react-native-vector-icons 图标
- [x] 获得设备相关信息
- [x] 轮播图
- [x] FlatList 展示新闻，WebView 查看新闻
- [x] 类似 Tinder 的卡片滑动，右滑收藏图片
- [x] 多种颜色主题切换
- [x] 新闻、图片收藏
- [x] 阿里云反馈统计

## 环境需求

* [react](https://github.com/facebook/react): 16.0.0-alpha.12
* [react-native](https://github.com/facebook/react-native): 0.48.4

## 依赖库

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - react native 的自定义图标，支持NavBar / TabBar / ToolbarAndroid，图像源和完整的样式
* [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info) - 获取 React Native iOS 和 Android 的设备信息
* [react-native-parallax-scroll-view](https://github.com/i6mi6/react-native-parallax-scroll-view) - 类似ScrollView的组件，支持视差和粘性头部
* [react-native-photo-browser](https://github.com/ksti/react-native-photo-browser) - reactnative 带有标题的图片浏览框架，支持图片缩放
* [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen) - React Native启动屏，解决iOS，Android启动白屏问题，支持Android和iOS
* [react-native-tinder-swipe-cards](https://github.com/meteor-factory/react-native-tinder-swipe-cards) - react native 类似 Tinder 的卡片滑动
* [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view) - react native 的选项卡视图组件
* [react-navigation](https://github.com/react-navigation/react-navigation) - react native 的导航组件

## 运行

#### 克隆和安装

* Clone this repo `git@github.com:songguoping/ReactNative-Tooyue.git`
* `cd ReactNative-Tooyue`
* run `npm install`
* run `react-native link`

#### iOS

* Run `react-native run-ios`

#### Android

* Run `android avd` and start an emulator
* Run `react-native run-android`

## 计划

- [ ] QQ、微信分享
- [ ] 版本更新
- [ ] ...

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).
