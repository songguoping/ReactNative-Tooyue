/**
 * Created by penn on 2016/12/14.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.timer=setTimeout(()=> {
            SplashScreen.hide();
            const {navigate} = this.props.navigation;
            navigate('Home');
        }, 500);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render() {
        return null;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    }
})
