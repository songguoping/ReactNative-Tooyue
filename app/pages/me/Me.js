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
        header: null,
    });

    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props);
        this.state = {
            project: config.project,
        }
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        const { navigate } = this.props.navigation;
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.Favorite:
                navigate('FavoritePage', {...this.props});
                break;
            case MORE_MENU.Custom_Theme:
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
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.Favorite), require('../../res/images/ic_favorite.png'), MORE_MENU.Favorite, this.props.screenProps.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.Custom_Theme), require('../../res/images/ic_view_quilt.png'), MORE_MENU.Custom_Theme,this.props.screenProps.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.About_Author), require('../../res/images/ic_insert_emoticon.png'), MORE_MENU.About_Author,this.props.screenProps.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
        </View>;
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, this.state.project,this.props.screenProps)}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

