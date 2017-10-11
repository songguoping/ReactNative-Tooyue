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
import ZhihuHeaderView from './ZhihuHeaderView';

import {getDailyList} from '../../http/ZhihuApis';
export default class ZhihuSectionsPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            zhihuList: [],
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
        const getDailyUrl = getDailyList();
        console.log(getDailyUrl);
        HttpUtils.get(getDailyUrl)
            .then((json) => {
                this.setState({
                    zhihuList: json.stories,
                    zhihuTopList:json.top_stories,
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
        return (
            <ZhihuCell item={item} onPressHandler={this.onItemPress}/>
        );
    }

    _header = (list) => {
        return <ZhihuHeaderView top_stories={list}/>;
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
                    renderItem={this.renderItem}
                    ListHeaderComponent={()=>this._header(this.state.zhihuTopList)}
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
