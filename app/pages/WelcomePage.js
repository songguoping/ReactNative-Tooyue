/**
 * Created by penn on 2016/12/14.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import ThemeDao from '../dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'
export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        });
        this.timer=setTimeout(()=> {
            SplashScreen.hide();
            const {navigate} = this.props.navigation;
            navigate('Home', {theme:this.theme});
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
