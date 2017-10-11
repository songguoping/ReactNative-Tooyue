/**
 * Created by user on 11/10/17.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

export default class ZhihuHeaderView extends Component {
    constructor(props){
        super(props);
        this.state={
            top_stories:this.props.top_stories,
        }
    }
    render() {
        const container = this.state.top_stories.map((item,index)=>{
            const view =(
                <View style={styles.slide} key={index} title={<Text numberOfLines={1} style={styles.text}>{item.title}</Text>}>
                    <Image style={styles.image} source={{uri:item.image}}/>
                </View>
            );
            return view;
        });
        return (
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={true}
                autoplay={true}
                autoplayDirection={true}
            >
                {container}
            </Swiper>
        )
    }
}

const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


const styles = {
    wrapper: {
        height:150
    },
    slide: {
        flex:1,
        backgroundColor: 'transparent'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        bottom:40
    },
    image: {
        width:width,
        flex:1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
}

