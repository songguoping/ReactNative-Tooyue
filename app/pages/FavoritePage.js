/**
 * Created by user on 20/12/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import BaseComponent from './base/BaseComponent'
import {colors} from '../res/styles/common';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import FavoriteDao ,{FLAG_STORAGE}from '../dao/FavoriteDao'
import ProjectModel from '../model/ProjectModel'
import ZhihuCell from '../pages/home/ZhihuCell'
import ActionUtils from '../utils/ActionUtils'
import {getDetailInfo} from '../http/ZhihuApis';
import * as GlobalStyles from "../res/styles/GlobalStyles";
import HttpUtils from "../http/HttpUtils";
import WelfareCell from "./welfare/WelfareCell";
export default class FavoritePage extends BaseComponent {
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: '收藏',
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
    });

    constructor(props) {
        super(props);

    }

    render() {
        let content = <ScrollableTabView
            tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
            tabBarInactiveTextColor='mintcream'
            tabBarActiveTextColor='white'
            ref="scrollableTabView"
            tabBarBackgroundColor={this.props.screenProps.theme.themeColor}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar tabStyle={GlobalStyles.tab} textStyle={GlobalStyles.tabText} />}
        >
            <FavoriteTab {...this.props} tabLabel='福利' column={2} flag={FLAG_STORAGE.flag_pic}/>
            <FavoriteTab {...this.props} tabLabel='新闻' column={1} flag={FLAG_STORAGE.flag_news}/>


        </ScrollableTabView>;
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
};

class FavoriteTab extends Component {
    constructor(props) {
        super(props);
        this.unFavoriteItems = [];
        this.favoriteDao = new FavoriteDao(this.props.flag);
        this.state = {
            refreshing: false,
            favoriteKeys: [],
            favoriteList: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(false);

    }

    loadData(isShowLoading) {
        if (isShowLoading)
            this.setState({
                refreshing: true,
            });
        this.favoriteDao.getAllItems().then((items)=> {
            var resultData = [];
            for (var i = 0, len = items.length; i < len; i++) {
                resultData.push(new ProjectModel(items[i], true));
            }
            this.setState({
                refreshing: false,
                favoriteList: resultData,
            });
        }).catch((error)=> {
            this.setState({
                refreshing: false,
            });
        });
    }

    onRefresh() {
        this.loadData(true);
    }

    renderItem({item,index}) {
        let CellComponent = this.props.flag === FLAG_STORAGE.flag_news ? ZhihuCell : WelfareCell;
        let {navigator}=this.props;
        return (
            <CellComponent
                key={this.props.flag === FLAG_STORAGE.flag_news ? item.id : item.item._id}
                onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(this.favoriteDao, item, isFavorite, this.props.flag)}
                isFavorite={true}
                theme={this.props.screenProps.theme}
                {...{navigator}}
                onSelect={()=>this.onItemPress(item.item,item.isFavorite,this.props.flag,index)}
                projectModel={item}/>
        );
    }

    onItemPress(item,isFavorite,flag,index) {
        const { navigate } = this.props.navigation;
        if(flag === FLAG_STORAGE.flag_news){
            const url = getDetailInfo(item.id);
            HttpUtils.get(url)
                .then((json) => {
                    navigate('Web', { json,isFavorite ,item});
                })
                .catch((error)=>{

                });
        }else {


            navigate('Photo', {media:this.state.favoriteList, index:index,isFavorite:isFavorite})
        }
    }

    render() {
        var content =
            <FlatList
                ref="FlatList"
                horizontal={false}
                numColumns={this.props.column}
                extraData={this.state}
                removeClippedSubviews={false}
                data={this.state.favoriteList}
                keyExtractor={(item, index) => index}
                renderItem={(data,index)=>this.renderItem(data,index)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={()=>this.onRefresh()}
                    />
                }
            />;
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    itemImg: {
        flex:1,
    },
});
