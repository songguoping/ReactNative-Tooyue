/**
 * Created by user on 11/10/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import HttpUtils from '../../http/HttpUtils';
import SectionsCell from './SectionsCell';

import {getThemeListInfo,getThemeList} from '../../http/ZhihuApis';
export default class ZhihuThemePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            themeList: [],
            refreshing: true,
            loading: false,
        };
        this.sendRequest = this.sendRequest.bind(this);
    }

    componentWillMount() {
        this.sendRequest();
    }

    sendRequest() {
        const getThemeUrl = getThemeList();
        HttpUtils.get(getThemeUrl)
            .then((json) => {
                this.setState({
                    themeList: json.others,
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
            <SectionsCell item={item} onPressHandler={this.onItemPress.bind(this)}/>
        );
    }

    onItemPress(item){
        const { navigate } = this.props.navigation;
        const url = getThemeListInfo(item.id);
        navigate('SectionsFlatList', { url ,title:item.name,...this.props});
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    horizontal={false}
                    extraData={this.state}
                    removeClippedSubviews={false}
                    data={this.state.themeList}
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
