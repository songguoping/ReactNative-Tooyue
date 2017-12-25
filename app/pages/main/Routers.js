/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../home/Home';
import SectionsFlatList from '../home/SectionsFlatList';

import FuLi from '../welfare/Welfare';

import Me from '../me/Me';
import CustomTheme from '../me/CustomTheme'

import WebViwPage from '../WebViewPage';

import WelcomePage from '../WelcomePage';

import {colors} from '../../res/styles/common';
import FavoritePage from "../FavoritePage";

const TabContainer = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({screenProps}) => (TabOptions('首页', 'md-home', '首页', screenProps)),

        },
        FuLi: {
            screen: FuLi,
            navigationOptions: ({screenProps}) => (TabOptions('福利', 'md-female', '福利', screenProps)),
        },
        Me: {
            screen: Me,
            navigationOptions: ({screenProps}) => (TabOptions('我的', 'md-person', '我的', screenProps)),
        },
    },

    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,// 是否可以左右滑动切换tab
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        labelStyle: {
            fontSize: 12,
            color: "#ff0000"
        },
        tabBarOptions: {
            style: {
                backgroundColor: 'white',
            },
        }
    }
);

const Routers = StackNavigator(
    {
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        Web: {screen: WebViwPage},
        SectionsFlatList: {screen: SectionsFlatList},
        CustomTheme: {screen: CustomTheme},
        FavoritePage: {screen: FavoritePage},
    },
    {

    }
);
const TabOptions = (tabBarTitle, iconName, navTitle, screenProps) => {
    const tabBarLabel = (({tintColor, focused}) => {
        return (
            <Text size={12}
                  style={[focused ? screenProps.theme.styles.selectedTab : {color: tintColor}, styles.tabBarLabel]}>{tabBarTitle}</Text>
        )
    });
    const tabBarIcon = (({tintColor, focused}) => {
        return (
            <Icon name={iconName} size={25}
                  style={focused ? screenProps.theme.styles.selectedTab : {color: tintColor}}/>
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
    // header的style
    const headerStyle = {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible};
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarLabel: {
        fontSize: 12,
        paddingBottom: 3
    }
});
export default Routers;
