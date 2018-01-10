/**
 * Created by user on 12/10/17.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');
const SectionsCell = ({item,onPressHandler})=>(
    <TouchableOpacity onPress={() => onPressHandler(item)}>
        <View style={styles.containerItem}>
            <Image style={styles.itemImg} source={{uri:item.thumbnail}}/>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    containerItem: {
        width:(width-20)/2,
        height:120,
        margin: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        position: 'absolute',
        fontSize: 18,
        textAlign: 'right',
        right:10,
        bottom:10,
        color: '#fff',
        backgroundColor:'transparent',
    },
    desc: {
        position: 'absolute',
        fontSize: 12,
        textAlign: 'left',
        left:10,
        top:10,
        right:10,
        color: '#fff',
        backgroundColor:'transparent',
    },
    itemImg: {
        flex:1,
    },
});

export default SectionsCell;