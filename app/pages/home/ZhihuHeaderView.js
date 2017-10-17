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
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Swiper from 'react-native-swiper'
import HttpUtils from '../../http/HttpUtils';

const {width} = Dimensions.get('window');
import {getDetailInfo} from '../../http/ZhihuApis';

export default class ZhihuHeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top_stories: this.props.top_stories,
        }
    }

    clickBanner(item) {
        const {navigate} = this.props.navigation;
        const url = getDetailInfo(item.id);
        HttpUtils.get(url)
            .then((json) => {
                navigate('Web', {json});
            })
            .catch((error) => {

            });
    }

    render() {
        const container = this.state.top_stories.map((item, index) => {
            const view = (
                <View style={styles.slide} key={index}
                      title={<Text numberOfLines={1} style={styles.text}>{item.title}</Text>}>
                    <TouchableWithoutFeedback key={index} onPress={() => {
                        this.clickBanner(item)
                    }}>
                        <Image style={styles.image} source={{uri: item.image}}/>
                    </TouchableWithoutFeedback>
                </View>

            );
            return view;
        });
        return (
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}
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
            <Text style={{color: 'grey'}}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}


const styles = {
    wrapper: {
        height: 150
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    text: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        bottom: 40
    },
    image: {
        width: width,
        flex: 1,
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

