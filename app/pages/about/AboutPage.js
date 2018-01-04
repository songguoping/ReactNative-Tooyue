/**
 * Created by user on 2/1/18.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import ViewUtils from "../../utils/ViewUtils";
import {MORE_MENU} from "../../common/MoreMenu";
import * as GlobalStyles from "../../res/styles/GlobalStyles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info'
export default class AboutPage extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '关于',
        headerStyle: {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor: 'white',
    });

    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        const {navigate} = this.props.navigation;
        switch (tab) {
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.Feedback:
                break;
            case MORE_MENU.About_Version:
                break;
            case MORE_MENU.About_Version_Update:
                break;

        }
        if (TargetComponent) {
            const {navigate} = this.props.navigation;
            navigate('TargetComponent', {params});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.ic_launcher} source={require('../../res/images/ic_launcher.png')}/>
                <Text style={styles.text_version}>当前版本：{DeviceInfo.getVersion()}</Text>
                {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.About_Author), <Icon name='md-happy' size={16}
                                                                                            style={[styles.icon, {color: this.props.screenProps.theme.themeColor}]}/>, MORE_MENU.About_Author, this.props.screenProps.theme.styles.tabBarSelectedIcon)}
                <View style={GlobalStyles.line}/>
                {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.Feedback), <MaterialIcon name='feedback'
                                                                                                size={16}
                                                                                                style={[styles.icon, {color: this.props.screenProps.theme.themeColor}]}/>, MORE_MENU.Feedback, this.props.screenProps.theme.styles.tabBarSelectedIcon)}
                <View style={GlobalStyles.line}/>
                {ViewUtils.getSettingItem(() => this.onClick(MORE_MENU.About_Version_Update), <MaterialCommunityIcon
                    name='update' size={16}
                    style={[styles.icon, {color: this.props.screenProps.theme.themeColor}]}/>, MORE_MENU.About_Version_Update, this.props.screenProps.theme.styles.tabBarSelectedIcon)}
            </View>);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    text_version:{
        alignSelf:'center',
        marginBottom:8
    },
    ic_launcher: {
        width: 80,
        height: 80,
        marginTop: 30,
        alignSelf:'center',
        marginBottom:30,
    },
    icon: {
        marginRight: 10
    }
});
