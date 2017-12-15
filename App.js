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
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './app/pages/home/Home';
import SectionsFlatList from './app/pages/home/SectionsFlatList';

import FuLi from './app/pages/welfare/Welfare';

import Me from './app/pages/me/Me';
import CustomTheme from './app/pages/me/CustomTheme'

import WebViwPage from './app/pages/WebViewPage';

import WelcomePage from './app/pages/WelcomePage';

import { colors } from './app/res/styles/common';

const TabContainer = TabNavigator(
    {
        Home: { screen: Home },
        FuLi: { screen: FuLi },
        Me: { screen: Me },
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled:false,// 是否可以左右滑动切换tab
        tabBarOptions: {
            activeTintColor: colors.colorPrimary,
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = StackNavigator(
    {
        WelcomePage: { screen: WelcomePage },
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null
            }
        },
        Web: { screen: WebViwPage },
        SectionsFlatList:{screen:SectionsFlatList},
        CustomTheme:{screen:CustomTheme},
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.colorPrimary
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

export default App;
