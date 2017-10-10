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

export default class FuLi extends React.Component{
    static navigationOptions = {
        title: '福利',
        tabBarIcon: ({ tintColor }) =>
            <Icon name="md-home" size={25} color={tintColor} />
    };

    render() {
        return <Text style={{flex:1}}>福利</Text>;
    }
}
