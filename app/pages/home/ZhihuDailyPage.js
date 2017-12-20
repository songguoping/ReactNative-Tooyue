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
import ToastUtil from '../../utils/ToastUtil';
import AppUtils from '../../utils/AppUtils';
import ActionUtils from '../../utils/ActionUtils'
import ZhihuCell from './ZhihuCell';
import ZhihuHeaderView from './ZhihuHeaderView';
import ProjectModel from '../../model/ProjectModel'
import {getDailyList} from '../../http/ZhihuApis';
import {getDetailInfo} from '../../http/ZhihuApis';
import FavoriteDao, {FLAG_STORAGE} from "../../dao/FavoriteDao";

var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_news);
export default class ZhihuDailyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zhihuList: [],
            zhihuTopList: [],
            refreshing: true,
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
        const getDailyUrl = getDailyList();
        console.log(getDailyUrl);
        HttpUtils.get(getDailyUrl)
            .then((json) => {
                this.items = json.stories;
                this.top_items = json.top_stories;
                this.getFavoriteKeys();
            })
            .catch((error) => {
                this.setState({
                    refreshing: false
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
            projectModels.push(new ProjectModel(items[i], AppUtils.checkFavorite(items[i].title , this.state.favoriteKeys)));
        }
        this.updateState({
            refreshing: false,
            zhihuList: projectModels,
            zhihuTopList: this.top_items,
        });
    }

    renderItem({item}) {
        return (
            <ZhihuCell 
                key={item.id} 
                projectModel={item}
                onSelect={()=>this.onItemPress(item.item,item.isFavorite)}
                onFavorite={(item, isFavorite)=>ActionUtils.onFavorite(favoriteDao,item, isFavorite,FLAG_STORAGE.flag_news)}
            />
        );
    }

    onItemPress(item,isFavorite) {
        const {navigate} = this.props.navigation;
        const url = getDetailInfo(item.id);
        HttpUtils.get(url)
            .then((json) => {
                navigate('Web', {json,isFavorite});
            })
            .catch((error) => {

            });
    }

    _header = (list) => {
        return <ZhihuHeaderView top_stories={list} {...this.props}/>;
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal={false}
                    extraData={this.state}
                    removeClippedSubviews={false}
                    data={this.state.zhihuList}
                    keyExtractor={(item, index) => index}
                    renderItem={(data) => this.renderItem(data)}
                    ListHeaderComponent={() => this._header(this.state.zhihuTopList)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
