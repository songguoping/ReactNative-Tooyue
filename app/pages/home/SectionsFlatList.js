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
import {getDetailInfo} from '../../http/ZhihuApis';
export default class SectionsFlatList extends Component{
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    constructor(props){
        super(props);
        this.state = {
            listData:[],
            refreshing: true,
        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        const { params } = this.props.navigation.state;
        HttpUtils.get(params.url)
            .then((json) => {
                this.setState({
                    listData: json.stories,
                    refreshing: false,
                });
            })
            .catch((error)=>{
                this.setState({
                    refreshing:false
                });
            });

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    renderItem({item}) {
        //转换json数据结构
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

