/**
 * Created by user on 10/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HttpUtils from '../../http/HttpUtils';
import ToastUtil from '../../utils/ToastUtil';
import ZhihuCell from './ZhihuCell';
import ZhihuHeaderView from './ZhihuHeaderView';

import {getDailyList} from '../../http/ZhihuApis';

export default class Home extends React.Component {
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-home" size={25} color={tintColor}/>
    };

    constructor(props) {
        super(props);
        this.state = {
            zhihuList: [],
            zhihuTopList:[],
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
                    zhihuTopList:json.top_stories
                });
            })

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
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userName: {
        flex: 1,
        fontSize: 14,
        color: '#87CEFA',
        marginTop: 5,
        marginRight: 5
    }
});
