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
import { NavigationActions } from 'react-navigation'
export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.timer=setTimeout(()=> {
            SplashScreen.hide();
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home'}),
                ]
            });
            this.props.navigation.dispatch(resetAction);
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
