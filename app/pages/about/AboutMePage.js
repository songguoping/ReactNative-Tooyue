/**
 * Created by user on 2/1/18.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class AboutMePage extends Component{
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: 'coderSong',
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
    });

    constructor(props) {
        super(props);
        this.state = {

        };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },

});
