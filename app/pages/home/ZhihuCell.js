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

const ZhihuCell = ({item,onPressHandler})=>(
    <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View style={styles.containerItem}>
            <Image style={styles.itemImg} source={{uri:item.images[0]}}/>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        color: '#333333'
    },
    itemImg: {
        width: 66,
        height: 66,
        marginRight: 10
    },
});

export default ZhihuCell;