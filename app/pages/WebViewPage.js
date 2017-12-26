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
    Modal,
    Platform,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../res/styles/common';
import LoadingView from '../components/LoadingView';
import ActionUtils from "../utils/ActionUtils";
import FavoriteDao, {FLAG_STORAGE} from "../dao/FavoriteDao";
let canGoBack = false;
let isFavorite = false;
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_news);
class WebViewPage extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: navigation.state.params.json.title,
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
        headerRight: (
            <View style={styles.headerRight}>
                <Icon
                    name="md-share"
                    size={22}
                    style={{padding:8,color:'white'}}
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.state.params.handleShare();
                    }}
                />
                <MaterialIcon
                    style={{padding:8,color:'white'}}
                    size={22}
                    name={navigation.state.params.favoriteIcon}
                    backgroundColor="white"
                    onPress={() => {
                        navigation.state.params.handleFavorite();
                    }}
                />
            </View>

        )
    });

    constructor(props) {
        super(props);
        this.state = {
            isShareModal: false
        };
        isFavorite = this.props.navigation.state.params.isFavorite;
        this.item = this.props.navigation.state.params.item;
        this.props.navigation.setParams({
            handleShare: this.onActionShare,
            handleFavorite: this.onActionFavorite,
            favoriteIcon:isFavorite?'favorite':'favorite-border'
        });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    onActionShare = () => {
        this.setState({
            isShareModal: true
        });
    };
    onActionFavorite = () => {
        isFavorite=!isFavorite;
        this.props.navigation.setParams({
            favoriteIcon:isFavorite?'favorite':'favorite-border'
        });
        ActionUtils.onFavorite(favoriteDao, this.item, isFavorite, FLAG_STORAGE.flag_news)
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
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
