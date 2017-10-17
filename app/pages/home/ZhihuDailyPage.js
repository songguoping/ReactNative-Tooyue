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
import {getDetailInfo} from '../../http/ZhihuApis';
export default class ZhihuDailyPage extends Component{
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

    renderItem({item}) {
        return (
            <ZhihuCell item={item} onPressHandler={this.onItemPress.bind(this)}/>
        );
    }

    onItemPress(item){
        const { navigate } = this.props.navigation;
        const url = getDetailInfo(item.id);
        HttpUtils.get(url)
            .then((json) => {
                navigate('Web', { json });
            })
            .catch((error)=>{

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
                    renderItem={(data)=>this.renderItem(data)}
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
