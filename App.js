/**
 * Created by Rabbit 下午6:58
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';

const { width , height} = Dimensions.get('window');

import Routers from './app/pages/main/Routers';
import ThemeDao from './app/dao/ThemeDao'
import {ACTION_HOME}from './app/pages/home/Home'
import ThemeFactory,{ThemeFlags} from './app/res/styles/ThemeFactory'
export default class App extends Component {
    state={
        theme:ThemeFactory.createTheme(ThemeFlags.Default)
    }
    componentDidMount(){
        new ThemeDao().getTheme().then((data)=>{
            this.setState({
                theme:data
            })
        });

        this.subscription = DeviceEventEmitter.addListener('ACTION_THEME',
            (action,params) => this.onThemeAction(action,params));
    };
    /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onThemeAction(action,params){
        if(ACTION_HOME.A_THEME===action){
            this.onThemeChange(params)
        }
    }

    componentWillUnmount(){
        this.subscription.remove();
    };
    /**
     * 当主题改变后更新主题
     * @param theme
     */
    onThemeChange(theme){
        if(!theme)return;
        this.setState({
            theme:theme
        })
    }
    render() {
        return(
            <View style={{flex:1}}>
                <Routers screenProps={{theme:this.state.theme}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});