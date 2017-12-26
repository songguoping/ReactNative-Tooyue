/**
 * Created by user on 25/12/17.
 */
import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import PhotoBrowser from 'react-native-photo-browser';
import FavoriteDao, {FLAG_STORAGE} from "../dao/FavoriteDao";
import ActionUtils from "../utils/ActionUtils";
let isFavorite = false;
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_pic);
class PhotoBrowserScene extends Component {
    static navigationOptions = {
        //1.隐藏导航头部
        header: null,
    };
    constructor(props){
        super(props);
        isFavorite = this.props.navigation.state.params.isFavorite;
        this.state = {
            favoriteIcon: isFavorite?require('../res/images/ic_star.png'):require('../res/images/ic_unstar_transparent.png')
        };
    }
    _goBack = () => {
        //2.点击返回关闭页面
        this.props.navigation.goBack()
    };

    _renderTopRightView() {
        return (
            <View style={{marginTop: 16, marginRight: 8, alignItems: 'center'}}>
                <Image
                    style={{width: 25, height: 25,tintColor:'white'}}
                    source={this.state.favoriteIcon}
                />
            </View>

        );
    }

    _onTopRight = (currentMedia, currentIndex, gallery) => {
        isFavorite=!isFavorite;
        this.setState({
            favoriteIcon:isFavorite?require('../res/images/ic_star.png'):require('../res/images/ic_unstar_transparent.png')
        });
        ActionUtils.onFavorite(favoriteDao, this.media[currentIndex].item, isFavorite, FLAG_STORAGE.flag_pic)
    };

    render() {
        //3.获取传入的图片等信息
        const { params } = this.props.navigation.state;
        this.media = params.media;
        let urls= [];
        //需要符合 react-native-photo-browser 的数据结构
        for (var i=0;i<this.media.length;i++){
            urls.push({photo:this.media[i].item.url})
        }
        const index = params.index;
        return (
            <PhotoBrowser
                onBack={this._goBack}
                mediaList={urls}
                initialIndex={index}
                displayTopBar={true}
                useGallery={true}
                enableGrid={false}
                onTopRight={this._onTopRight}
                topRightView={this._renderTopRightView()}
            />
        );
    }
}
export default PhotoBrowserScene;

