/**
 * Created by user on 11/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

export default class ZhihuCell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setFavoriteState(nextProps.projectModel.isFavorite)
    }

    setFavoriteState(isFavorite) {
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }

    render(){
        let item = this.props.projectModel.item;
        let favoriteButton=item?
            <TouchableOpacity
                style={{padding:6}}
                onPress={()=>this.onPressFavorite()} underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22,}]}
                    source={this.state.favoriteIcon}/>
            </TouchableOpacity>:null;

        if (item.images!=null){

            return <TouchableOpacity  onPress={this.props.onSelect}>
                <View style={styles.containerItem}>
                    <Image style={styles.itemImg} source={{uri:item.images[0]}}/>
                    <Text style={styles.title}>{item.title}</Text>
                    {favoriteButton}
                </View>
            </TouchableOpacity>
        }else {
            return <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.containerItem}>
                    <Image style={styles.itemImg} source={{uri:'https://facebook.github.io/react/logo-og.png'}}/>
                    <Text style={styles.title}>{item.title}</Text>
                    {favoriteButton}
                </View>
            </TouchableOpacity>
        }
    }
}

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 15,
        paddingLeft: 8,
        paddingRight:8,
        textAlign: 'left',
        color: '#333333'
    },
    itemImg: {
        width: 66,
        height: 66,
    },
});
