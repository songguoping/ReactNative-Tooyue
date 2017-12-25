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
import ZhihuDailyPage from './ZhihuDailyPage';
import ZhihuThemePage from './ZhihuThemePage';
import ZhihuHotPage from './ZhihuHotPage';
import ZhihuSectionsPage from './ZhihuSectionsPage';
import { colors } from '../../res/styles/common';
import ThemeDao from '../../dao/ThemeDao'
import * as GlobalStyles from "../../res/styles/GlobalStyles";
export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};

export default class Home extends React.Component {
  /*  static navigationOptions = ({navigation,screenProps}) =>({
        title: '首页',
        headerStyle:{backgroundColor:screenProps?screenProps.theme.themeColor:colors.colorPrimary},
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-home" size={25} color={screenProps?screenProps.theme.themeColor:tintColor}/>
    });*/

    constructor(props) {
        super(props);
        this.state = {
            categoryIds: [
                { key: 'daily', value: '日报' },
                { key: 'theme', value: '主题' },
                { key: 'sections', value: '专题' },
                { key: 'hot', value: '热门' },
            ],
        };
    }

    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                scrollWithoutAnimation={true}
                prerenderingSiblingsNumber={1}
                renderTabBar={() => <ScrollableTabBar tabStyle={GlobalStyles.tab} textStyle={GlobalStyles.tabText} />}
                tabBarBackgroundColor={this.props.screenProps.theme.themeColor}
                tabBarUnderlineStyle={styles.tabIndicator}
                tabBarInactiveTextColor='mintcream'
                tabBarActiveTextColor='white'
            >
                <ZhihuDailyPage tabLabel={this.state.categoryIds[0].value} {...this.props}/>
                <ZhihuThemePage tabLabel={this.state.categoryIds[1].value} {...this.props}/>
                <ZhihuSectionsPage tabLabel={this.state.categoryIds[2].value} {...this.props}/>
                <ZhihuHotPage tabLabel={this.state.categoryIds[3].value} {...this.props}/>
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
    tabIndicator: {
        backgroundColor: colors.texte7,
        height: 2
    }
});
