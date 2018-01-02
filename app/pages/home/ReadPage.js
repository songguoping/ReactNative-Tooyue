/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Dimensions
} from 'react-native';
import ZhihuDailyPage from './ZhihuDailyPage';
import ZhihuThemePage from './ZhihuThemePage';
import ZhihuHotPage from './ZhihuHotPage';
import ZhihuSectionsPage from './ZhihuSectionsPage';
import * as GlobalStyles from "../../res/styles/GlobalStyles";
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
const windowWidth = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: windowWidth,
};

export default class ReadPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: '日报' },
                { key: '2', title: '主题' },
                { key: '3', title: '专题' },
                { key: '4', title: '热门' },
            ],
        };
    }
    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (<ZhihuDailyPage  {...this.props} />);
            case '2':
                return (<ZhihuThemePage {...this.props} />);
            case '3':
                return (<ZhihuSectionsPage {...this.props} />);
            case '4':
                return (<ZhihuHotPage {...this.props} />);
            default:
                return null;
        }
    };
    _renderHeader = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={GlobalStyles.indicator}
            style={{backgroundColor: this.props.screenProps.theme.themeColor}}
            tabStyle={styles.tab}
            labelStyle={GlobalStyles.tabText}
        />
    );

    _handleIndexChange = index => this.setState({ index });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={this.props.screenProps.theme.themeColor}
                    barStyle="light-content"
                />

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab: {
        width: windowWidth/4,
    },

});
