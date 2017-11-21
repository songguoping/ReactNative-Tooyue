/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import GlobalStyles from '../../res/styles/GlobalStyles'

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + 20 : GlobalStyles.nav_bar_height_android;
import config from '../../res/data/config.json'
import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon from '../../common/AboutCommon'

export default class Me extends React.Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        header: null,
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-home" size={25} color={tintColor}/>
    };

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props);
        this.state = {
            author: config.author
        }
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.About_Author:
                TargetComponent = AboutMePage;
                break;
            case MORE_MENU.Favorite:
                break;
            case MORE_MENU.Custom_Theme:
                break;
            case MORE_MENU.Share:
                break;

        }
        if (TargetComponent) {
            const {navigate} = this.props.navigation;
            navigate('TargetComponent', {params});
        }
    }

    render() {
        let content = <View>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.Favorite), require('../../res/images/ic_favorite.png'), MORE_MENU.Favorite)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.Custom_Theme), require('../../res/images/ic_view_quilt.png'), MORE_MENU.Custom_Theme)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.About_Author), require('../../res/images/ic_insert_emoticon.png'), MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
        </View>
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, this.state.author)}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

