/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewUtils from '../../utils/ViewUtils';
import GlobalStyles from '../../res/styles/GlobalStyles'


import config from '../../res/data/config.json'
import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon from '../../common/AboutCommon'
import BaseComponent from '../base/BaseComponent'
export default class Me extends BaseComponent {
    static navigationOptions = ({navigation}) => ({
        tabBarLabel: '我的',
        header: null,
        headerStyle: {
            backgroundColor: navigation.state.params.theme.navBar
        },
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-person" size={25} color={navigation.state.params.theme.styles.tabBarSelectedIcon}/>
    });

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props);
        this.state = {
            project: config.project,
            theme:this.props.navigation.state.theme
        }
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.Favorite:
                break;
            case MORE_MENU.Custom_Theme:
                const { navigate } = this.props.navigation;
                navigate('CustomTheme', {...this.props});
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
        </View>;
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, this.state.project)}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

