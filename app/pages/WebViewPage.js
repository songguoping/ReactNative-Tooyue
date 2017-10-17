/*
 * @Desc:  webview
 * @Author: LeonWang 
 * @Date: 2017-09-18 10:30:38  
 * */

import React, {Component} from 'react';
import {
    WebView,
    StyleSheet,
    InteractionManager,
    View,
    BackHandler,
    Dimensions,
    Modal
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../res/styles/common';
import LoadingView from '../components/LoadingView';
let canGoBack = false;


class WebViewPage extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.json.title,
        tabBarIcon: ({tintColor}) =>
            <Icon name="md-home" size={25} color={tintColor}/>,
        headerRight: (
            <Icon.Button
                name="md-share"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                    navigation.state.params.handleShare();
                }}
            />
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            isShareModal: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({handleShare: this.onActionSelected});
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    onActionSelected = () => {
        this.setState({
            isShareModal: true
        });
    };

    onNavigationStateChange = (navState) => {
        canGoBack = navState.canGoBack;
    };

    goBack = () => {
        if (this.state.isShareModal) {
            this.setState({
                isShareModal: false
            });
            return true;
        } else if (canGoBack) {
            this.webview.goBack();
            return true;
        }
        return false;
    };

    renderLoading = () => <LoadingView />;

    renderSpinner(){
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    visible={this.state.isShareModal}
                    transparent
                    onRequestClose={() => {
                        this.setState({
                            isShareModal: false
                        });
                    }}
                >
                    {this.renderSpinner()}
                </Modal>
                <WebView
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    style={styles.base}
                    source={{ html:params.json.body,baseUrl:'https://www.baidu.com'}}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={() => {
                        const shouldStartLoad = true;
                        return shouldStartLoad;
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                    renderLoading={this.renderLoading}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width * (7 / 10),
        height: Dimensions.get('window').width * (7 / 10) * 0.68,
        backgroundColor: '#fcfcfc',
        padding: 20,
        borderRadius: 5
    },
    spinnerTitle: {
        fontSize: 18,
        color: '#313131',
        textAlign: 'center',
        marginTop: 5
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 20
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40
    }
});

export default WebViewPage;
