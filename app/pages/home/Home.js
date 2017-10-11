/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import HttpUtils from '../../http/HttpUtils';
import ToastUtil from '../../utils/ToastUtil';
import ZhihuCell from './ZhihuCell';
import ZhihuHeaderView from './ZhihuHeaderView';
import ZhihuDailyPage from './ZhihuDailyPage';
import ZhihuThemePage from './ZhihuThemePage';
import ZhihuHotPage from './ZhihuHotPage';
import ZhihuSectionsPage from './ZhihuSectionsPage';

import {getDailyList} from '../../http/ZhihuApis';
import { colors } from '../../res/styles/common';

export default class Home extends React.Component {
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-home" size={25} color={tintColor}/>
    };

    constructor(props) {
        super(props);
        this.state = {
            categoryIds: [
                { key: 'daily', value: '日报' },
                { key: 'theme', value: '主题' },
                { key: 'sections', value: '专题' },
                { key: 'hot', value: '热门' },
            ]
        };
    }

    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar tabStyle={styles.tab} textStyle={styles.tabText} />}
                tabBarBackgroundColor={colors.colorPrimary}
                tabBarUnderlineStyle={styles.tabIndicator}
                tabBarActiveTextColor={colors.white}
                tabBarInactiveTextColor={colors.colorAccent}
            >
                <ZhihuDailyPage tabLabel={this.state.categoryIds[0].value} />
                <ZhihuThemePage tabLabel={this.state.categoryIds[1].value} />
                <ZhihuSectionsPage tabLabel={this.state.categoryIds[2].value} />
                <ZhihuHotPage tabLabel={this.state.categoryIds[3].value} />
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userName: {
        flex: 1,
        fontSize: 14,
        color: '#87CEFA',
        marginTop: 5,
        marginRight: 5
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabIndicator: {
        backgroundColor: colors.white,
        height: 3
    }
});
