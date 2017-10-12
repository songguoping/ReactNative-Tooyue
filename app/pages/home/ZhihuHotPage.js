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
import ZhihuCell from './ZhihuCell';

import {getHotList} from '../../http/ZhihuApis';
export default class ZhihuHotPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hotList: [],
            zhihuTopList:[],
            refreshing: true,
            loading: false,
        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        const getHotUrl = getHotList();
        HttpUtils.get(getHotUrl)
            .then((json) => {
                this.setState({
                    hotList: json.recent,
                    refreshing: false,
                });
            })
            .catch((error)=>{
                this.setState({
                    refreshing:false
                });
            });

    }
    renderItem({item, index}) {
        //转换json数据结构
        var hot = new Hot(item.title,item.thumbnail);
        return (
            <ZhihuCell item={hot} onPressHandler={this.onItemPress}/>
        );
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
                    renderItem={this.renderItem}
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
function Hot(title,image) {
    this.title=title;
    this.images=[image];
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
