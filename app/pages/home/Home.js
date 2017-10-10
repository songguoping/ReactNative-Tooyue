/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends React.Component{
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({ tintColor }) =>
            <Icon name="md-home" size={25} color={tintColor} />
    };

    render() {
        return <Text style={{flex:1}}>首页</Text>;
    }
}
