/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View,
    Linking,

} from 'react-native'
export const MORE_MENU = {
    About_Author: '关于作者',
    About_Version: '当前版本',
    About_Version_Update: '版本更新',
    Custom_Theme: '自定义主题',
    About: '关于',
    Favorite: '收藏',
    Feedback: '反馈',
    Share: '分享',
}
export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    /**
     * 打开更多菜单
     */
    open() {
        this.showPopover();
    }

    showPopover() {
    }


    render() {

    }
}
