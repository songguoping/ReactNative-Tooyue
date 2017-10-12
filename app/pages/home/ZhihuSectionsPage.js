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
import SectionsCell from './SectionsCell';

import {getSectionsList} from '../../http/ZhihuApis';
export default class ZhihuSectionsPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sectionsList: [],
            refreshing: true,
            loading: false,
        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        const getSectionsUrl = getSectionsList();
        HttpUtils.get(getSectionsUrl)
            .then((json) => {
                this.setState({
                    sectionsList: json.data,
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
            <SectionsCell item={item} onPressHandler={this.onItemPress}/>
        );
    }

    _header = (list) => {
        return <ZhihuHeaderView top_stories={list}/>;
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    horizontal={false}
                    extraData={this.state}
                    removeClippedSubviews={false}
                    data={this.state.sectionsList}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
