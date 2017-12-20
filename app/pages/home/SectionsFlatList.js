/**
 * Created by user on 18/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    BackHandler
} from 'react-native';
import HttpUtils from '../../http/HttpUtils';
import ToastUtil from '../../utils/ToastUtil';
import ZhihuCell from './ZhihuCell';
import ActionUtils from '../../utils/ActionUtils'
import FavoriteDao, {FLAG_STORAGE} from "../../dao/FavoriteDao";
import ProjectModel from '../../model/ProjectModel'
import AppUtils from '../../utils/AppUtils';
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_news);
import {getDetailInfo} from '../../http/ZhihuApis';
export default class SectionsFlatList extends Component{
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: navigation.state.params.title,
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
    });

    constructor(props){
        super(props);
        this.state = {
            listData:[],
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
        const { params } = this.props.navigation.state;
        HttpUtils.get(params.url)
            .then((json) => {
                this.items=json.stories;
                this.getFavoriteKeys();
            })
            .catch((error)=>{
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
            listData: projectModels,
        });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
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
        const { navigate } = this.props.navigation;
        const url = getDetailInfo(item.id);
        HttpUtils.get(url)
            .then((json) => {
                navigate('Web', { json ,isFavorite});
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
                    data={this.state.listData}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

