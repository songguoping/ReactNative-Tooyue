/**
 * Created by user on 11/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import HttpUtils from '../../http/HttpUtils';
import AppUtils from '../../utils/AppUtils';
import ActionUtils from '../../utils/ActionUtils'
import ToastUtil from '../../utils/ToastUtil';
import ZhihuCell from './ZhihuCell';
import ProjectModel from '../../model/ProjectModel'
import {getDetailInfo,getHotList} from '../../http/ZhihuApis';
import FavoriteDao, {FLAG_STORAGE} from "../../dao/FavoriteDao";

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_news);
export default class ZhihuHotPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
            refreshing: true,
            loading: false,
            favoriteKeys: [],

        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        const getHotUrl = getHotList();
        HttpUtils.get(getHotUrl)
            .then((json) => {
                //转换json数据结构
                let items =json.recent;
                let hots = [];
                for(var i=0;i<items.length;i++){
                    let item = items[i];
                    hots.push(new Hot(item.news_id,item.title,item.thumbnail))
                }
                this.items = hots;
                this.getFavoriteKeys();
            })
            .catch((error)=>{
                console.log(error);
                this.setState({
                    refreshing:false
                });
            });

    }

    /**
     * 获取本地用户收藏的ProjectItem
     */
    getFavoriteKeys() {
        favoriteDao.getFavoriteKeys().then((keys) => {
            if (keys) {
                this.updateState({favoriteKeys: keys});
            }
            this.flushFavoriteState();
        }).catch((error) => {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    /**
     * 更新ProjectItem的Favorite状态
     */
    flushFavoriteState() {
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], AppUtils.checkFavorite(items[i].title, this.state.favoriteKeys)));
        }
        this.updateState({
            refreshing: false,
            hotList: projectModels,
        });
    }

    renderItem({item}) {
        return (
            <ZhihuCell
                key={item.id}
                projectModel={item}
                onSelect={()=>this.onItemPress(item.item,item.isFavorite)}
                onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(favoriteDao,item, isFavorite,FLAG_STORAGE.flag_news)}/>
        );
    }
    onItemPress(item,isFavorite) {
        const { navigate } = this.props.navigation;
        const url = getDetailInfo(item.id);
        HttpUtils.get(url)
            .then((json) => {
                navigate('Web', { json,isFavorite });
            })
            .catch((error)=>{

            });
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal={false}
                    extraData={this.state}
                    removeClippedSubviews={false}
                    data={this.state.hotList}
                    keyExtractor={(item, index) => index}
                    renderItem={(data)=>this.renderItem(data)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.sendRequest}
                        />
                    }
                />
            </View>
        );
    }
}
function Hot(id,title,image) {
    this.id=id;
    this.title=title;
    this.images=[image];
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
