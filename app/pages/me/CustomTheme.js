/**
 * 自定义主题
 * @flow
 * **/
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight,
    Modal,
    DeviceEventEmitter
} from "react-native";
import GlobalStyles from '../../res/styles/GlobalStyles'
import ThemeFactory,{ThemeFlags} from '../../res/styles/ThemeFactory'
import ThemeDao from '../../dao/ThemeDao'
import {ACTION_HOME} from '../home/Home'
export default class CustomTheme extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: '自定义主题',
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
    });
    constructor(props){
        super(props);
        this.themeDao=new ThemeDao();
    }
    onSelectTheme(themeKey){
        this.themeDao.save(ThemeFlags[themeKey]);
        DeviceEventEmitter.emit('ACTION_THEME',ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags[themeKey]));
        this.props.navigation.goBack();
    }
    /**
     * 创建主题Item
     * @param themeKey
     */
    getThemeItem(themeKey){
        return <TouchableHighlight
            style={{flex:1}}
            underlayColor='white'
            onPress={()=>this.onSelectTheme(themeKey)}
        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>
    }

    /**
     * 创建主题列表
     * @returns {Array}
     */
    renderThemeItems(){
        var views=[];
        for (let i=0,keys=Object.keys(ThemeFlags),l=keys.length;i<l;i+=3){
            var key1=keys[i],key2=keys[i+1],key3=keys[i+2];
            views.push(<View key={i} style={{flexDirection:'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }
    render() {
        return <View style={styles.modalContainer}>
            <ScrollView>
                {this.renderThemeItems()}
            </ScrollView>
        </View>;
    }

}
const styles = StyleSheet.create({
    themeItem: {
        flex:1,
        height: 120,
        margin:3,
        padding:3,
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        padding:3
    },
    themeText:{
        color:'white',
        fontWeight:'500',
        fontSize:16
    }
});