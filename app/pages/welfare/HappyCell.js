/**
 * Created by user on 25/12/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class HappyCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
        };
    }

    render() {
        return <TouchableOpacity onPress={this.props.onSelect} >
        <Image style={styles.img} source={{uri: this.props.projectModel.item.url}}/>
    </TouchableOpacity>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    img: {
        margin: 8,
        borderRadius: 5,
        width: width / 2 - 8 * 2,
        height: width / 2 - 8 * 2,
    }
});
